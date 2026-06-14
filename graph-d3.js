/**
 * Graph View - D3.js Based with Filters (Quartz-inspired)
 * Renders interactive knowledge graph with zoom, pan, filters, and click-to-navigate
 */

(function() {
  'use strict';

  const graphBtn = document.getElementById('graph-btn');
  const graphModal = document.getElementById('graph-modal');
  const graphClose = document.getElementById('graph-close');
  const container = document.getElementById('graph-network');

  let simulation = null;
  let svg = null;
  let graphData = null;
  let allNodes = [];
  let allLinks = [];
  let isInitialized = false;
  let activeFilters = {
    types: new Set(),
    categories: new Set()
  };

  // Get current note slug from URL
  const currentSlug = (() => {
    const pathname = window.location.pathname;
    const match = pathname.match(/\/([^/]+)\.html$/);
    return match ? match[1] : '';
  })();

  // Color mapping for note types
  const typeColors = {
    'seedling': '#6d9b5a',
    'growing': '#7a6b9e',
    'evergreen': '#4a8a7e',
    'default': '#999'
  };

  /**
   * Load graph data and initialize D3 visualization
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

      allNodes = graphData.nodes;
      allLinks = graphData.links || [];

      // Initialize all filters as active by default
      allNodes.forEach(node => {
        activeFilters.types.add(node.type);
        if (node.category) activeFilters.categories.add(node.category);
      });

      createFilterUI();
      renderGraph();
      isInitialized = true;
    } catch (error) {
      console.error('Error initializing graph:', error);
    }
  }

  /**
   * Create filter UI in the legend
   */
  function createFilterUI() {
    const legend = graphModal.querySelector('.graph-legend');
    if (!legend) return;

    // Create filters section
    const filterSection = document.createElement('div');
    filterSection.className = 'graph-filters';
    filterSection.style.cssText = 'margin-top: 12px; padding-top: 12px; border-top: 1px solid #ddd;';

    // Type filters
    const types = [...new Set(allNodes.map(n => n.type).filter(Boolean))].sort();
    const typeLabel = document.createElement('div');
    typeLabel.style.cssText = 'font-size: 11px; font-weight: bold; margin-bottom: 6px;';
    typeLabel.textContent = 'Types:';
    filterSection.appendChild(typeLabel);

    types.forEach(type => {
      const label = document.createElement('label');
      label.style.cssText = 'display: flex; align-items: center; font-size: 10px; margin-bottom: 4px; cursor: pointer;';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = true;
      checkbox.style.cssText = 'margin-right: 6px; cursor: pointer;';
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          activeFilters.types.add(type);
        } else {
          activeFilters.types.delete(type);
        }
        updateGraph();
      });

      const dot = document.createElement('span');
      dot.textContent = '●';
      dot.style.cssText = `color: ${typeColors[type]}; margin-right: 4px;`;

      label.appendChild(checkbox);
      label.appendChild(dot);
      label.appendChild(document.createTextNode(type));
      filterSection.appendChild(label);
    });

    // Category filters
    const categories = [...new Set(allNodes.map(n => n.category).filter(Boolean))].sort();
    if (categories.length > 0) {
      const categoryLabel = document.createElement('div');
      categoryLabel.style.cssText = 'font-size: 11px; font-weight: bold; margin-top: 8px; margin-bottom: 6px;';
      categoryLabel.textContent = 'Categories:';
      filterSection.appendChild(categoryLabel);

      categories.forEach(category => {
        const label = document.createElement('label');
        label.style.cssText = 'display: flex; align-items: center; font-size: 10px; margin-bottom: 4px; cursor: pointer;';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.style.cssText = 'margin-right: 6px; cursor: pointer;';
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) {
            activeFilters.categories.add(category);
          } else {
            activeFilters.categories.delete(category);
          }
          updateGraph();
        });

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(category));
        filterSection.appendChild(label);
      });
    }

    legend.appendChild(filterSection);
  }

  /**
   * Filter nodes and links based on active filters
   */
  function getFilteredData() {
    const filteredNodes = allNodes.filter(node =>
      activeFilters.types.has(node.type) &&
      (!node.category || activeFilters.categories.has(node.category))
    );

    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredLinks = allLinks.filter(link =>
      filteredNodeIds.has(link.source) && filteredNodeIds.has(link.target)
    );

    return { nodes: filteredNodes, links: filteredLinks };
  }

  /**
   * Render D3.js force graph
   */
  function renderGraph() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Clear previous content
    container.innerHTML = '';

    // Create SVG
    svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Add zoom behavior
    const zoom = d3.zoom()
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Create group for zoom/pan
    const g = svg.append('g');

    drawGraph(g, width, height);
  }

  /**
   * Update graph when filters change
   */
  function updateGraph() {
    if (!svg) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const g = svg.select('g');
    g.selectAll('*').remove();

    drawGraph(g, width, height);
  }

  /**
   * Draw the graph with current filters
   */
  function drawGraph(g, width, height) {
    const { nodes, links } = getFilteredData();

    // Transform data
    const graphNodes = nodes.map(node => ({
      ...node,
      id: node.id,
      isCurrent: currentSlug === node.id
    }));

    const graphLinks = links.map(link => ({
      source: link.source,
      target: link.target
    }));

    // Create force simulation
    simulation = d3.forceSimulation(graphNodes)
      .force('link', d3.forceLink(graphLinks).id(d => d.id).distance(80))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(25));

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(graphLinks)
      .enter()
      .append('line')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1.5);

    // Create nodes
    const node = g.append('g')
      .selectAll('circle')
      .data(graphNodes)
      .enter()
      .append('circle')
      .attr('r', d => d.isCurrent ? 12 : 8)
      .attr('fill', d => typeColors[d.type] || typeColors['default'])
      .attr('stroke', d => d.isCurrent ? '#000' : 'none')
      .attr('stroke-width', d => d.isCurrent ? 3 : 0)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        if (d.url) {
          window.location.href = d.url;
        }
      })
      .call(drag(simulation));

    // Add labels on hover
    const labels = g.append('g')
      .selectAll('text')
      .data(graphNodes)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .attr('font-size', '11px')
      .attr('fill', '#333')
      .attr('pointer-events', 'none')
      .attr('opacity', 0)
      .text(d => d.label);

    // Show label on hover
    node.on('mouseenter', function(event, d) {
      d3.select(this).transition()
        .duration(200)
        .attr('r', d => d.isCurrent ? 15 : 11);

      labels.filter(label => label.id === d.id)
        .transition()
        .duration(200)
        .attr('opacity', 1);
    })
    .on('mouseleave', function(event, d) {
      d3.select(this).transition()
        .duration(200)
        .attr('r', d => d.isCurrent ? 12 : 8);

      labels.filter(label => label.id === d.id)
        .transition()
        .duration(200)
        .attr('opacity', 0);
    });

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

      labels
        .attr('x', d => d.x)
        .attr('y', d => d.y);
    });

    // Initial zoom to fit
    setTimeout(() => {
      const bounds = g.node().getBBox();
      const scale = 0.8 / Math.max(bounds.width / width, bounds.height / height);
      const translateX = (width - scale * (bounds.x + bounds.width / 2)) / 2;
      const translateY = (height - scale * (bounds.y + bounds.height / 2)) / 2;

      svg.transition()
        .duration(750)
        .call(d3.zoom().transform,
          d3.zoomIdentity.translate(translateX, translateY).scale(scale)
        );
    }, 500);
  }

  /**
   * Drag behavior for nodes
   */
  function drag(simulation) {
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  }

  /**
   * Show graph modal
   */
  function showGraph() {
    graphModal.classList.add('active');
    if (!isInitialized) {
      initGraph();
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

  document.addEventListener('keydown', handleKeyDown);

  // Clean up on unload
  window.addEventListener('beforeunload', () => {
    if (simulation) {
      simulation.stop();
    }
  });
})();
