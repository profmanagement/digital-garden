/**
 * Graph View Initialization
 * Loads graph-data.json and renders interactive knowledge graph using Vis.js
 */

(function() {
  'use strict';

  // Get current note slug from URL
  const currentSlug = (() => {
    const pathname = window.location.pathname;
    const match = pathname.match(/\/([^/]+)\.html$/);
    return match ? match[1] : '';
  })();

  const graphBtn = document.getElementById('graph-btn');
  const graphModal = document.getElementById('graph-modal');
  const graphClose = document.getElementById('graph-close');
  const container = document.getElementById('graph-network');

  let network = null;
  let graphData = null;
  let isInitialized = false;

  // Color mapping for note types
  const typeColors = {
    'seedling': '#6d9b5a',
    'growing': '#7a6b9e',
    'evergreen': '#4a8a7e',
    'default': '#999'
  };

  /**
   * Load graph data and initialize Vis.js network
   */
  async function initGraph() {
    if (isInitialized) return;

    try {
      // Load graph data
      const response = await fetch('graph-data.json');
      if (!response.ok) {
        console.error('Failed to load graph-data.json');
        return;
      }

      graphData = await response.json();

      if (!graphData.nodes || graphData.nodes.length === 0) {
        console.warn('No nodes in graph data');
        return;
      }

      // Transform nodes for Vis.js
      const nodes = new vis.DataSet(
        graphData.nodes.map(node => {
          const isCurrentNote = currentSlug === node.id;
          return {
            id: node.id,
            label: node.label,
            title: node.label,
            color: {
              background: typeColors[node.type] || typeColors.default,
              border: isCurrentNote ? '#333' : '#999'
            },
            font: {
              size: isCurrentNote ? 18 : 14,
              color: '#fff'
            },
            borderWidth: isCurrentNote ? 3 : 1,
            physics: true,
            mass: isCurrentNote ? 3 : 1
          };
        })
      );

      // Transform edges for Vis.js
      const edges = new vis.DataSet(
        graphData.links.map(link => ({
          from: link.source,
          to: link.target,
          color: '#ccc',
          physics: true
        }))
      );

      // Configure physics and interaction
      const options = {
        physics: {
          enabled: true,
          barnesHut: {
            gravitationalConstant: -15000,
            centralGravity: 0.3,
            springLength: 150,
            springConstant: 0.08
          },
          maxVelocity: 50,
          solver: 'barnesHut',
          timestep: 0.5,
          stabilization: { iterations: 150 }
        },
        interaction: {
          navigationButtons: false,
          keyboard: false,
          zoomView: true,
          dragView: true
        },
        edges: {
          smooth: { type: 'continuous' },
          color: '#999'
        }
      };

      // Create network
      network = new vis.Network(container, { nodes, edges }, options);

      // Handle node clicks for navigation
      network.on('click', handleNodeClick);

      // Fit to container after stabilization
      network.once('stabilizationIterationsDone', () => {
        network.setOptions({ physics: false });
        network.fit({ animation: { duration: 500 } });
      });

      isInitialized = true;
    } catch (error) {
      console.error('Error initializing graph:', error);
    }
  }

  /**
   * Handle node click event - navigate to note
   */
  function handleNodeClick(event) {
    if (event.nodes && event.nodes.length > 0) {
      const nodeId = event.nodes[0];
      const node = graphData.nodes.find(n => n.id === nodeId);
      if (node && node.url) {
        window.location.href = node.url;
      }
    }
  }

  /**
   * Show graph modal
   */
  function showGraph() {
    graphModal.classList.add('active');
    if (!isInitialized) {
      initGraph();
    } else if (network) {
      network.fit({ animation: { duration: 300 } });
    }
  }

  /**
   * Hide graph modal
   */
  function hideGraph() {
    graphModal.classList.remove('active');
  }

  /**
   * Handle Escape key
   */
  function handleKeyDown(e) {
    if (e.key === 'Escape' && graphModal.classList.contains('active')) {
      hideGraph();
    }
  }

  // Event listeners
  if (graphBtn) {
    graphBtn.addEventListener('click', showGraph);
  }

  if (graphClose) {
    graphClose.addEventListener('click', hideGraph);
  }

  // Close on Escape key
  document.addEventListener('keydown', handleKeyDown);

  // Clean up on unload
  window.addEventListener('beforeunload', () => {
    if (network) {
      network.destroy();
    }
  });
})();
