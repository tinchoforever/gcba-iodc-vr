/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */


AFRAME.registerComponent('show-detail', {
  schema: {
    on: {type: 'string'},
    item: {type: 'string'},
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    var animated = false;
    el.setAttribute('animation__fade', {
        property: 'scale',
        startEvents: 'move-now',
        dir: 'alternate',
        dur: 175,
        from: '0.5 0.5 0.5',
        to: '1 1 1'
      });
      el.setAttribute('animation__fade_2', {
        property: 'rotation',
        startEvents: 'move-now',
        dir: 'alternate',
        dur: 175,
        from: '0 0 0',
        to: '0 180 0'
      });
      el.setAttribute('animation__fade_3', {
        property: 'position',
        startEvents: 'move-now',
        dir: 'alternate',
        dur: 175,
        from: '0 0 0',
        to: '0 0 4'
      });
      el.setAttribute('animation__leave', {
        property: 'scale',
        startEvents: 'move-out',
        dir: 'alternate',
        dur: 175,
        from: '1 1 1',
        to: '0.5 0.5 0.5'
        
      });
      el.setAttribute('animation__leave_1', {
        property: 'position',
        startEvents: 'move-out',
        dir: 'alternate',
        dur: 175,
        from: '0 0 4',
        to: '0 0 0'
      });
      el.setAttribute('animation__leave_2', {
        property: 'rotation',
        startEvents: 'move-out',
        dir: 'alternate',
        dur: 175,
        from: '0 180 0',
        to: '0 0 0'
      });
    el.addEventListener(data.on, function () {
      // Create animation.

      if (!animated){
        d3.selectAll('a-entity.item.active').dispatch('move-out');

        d3.select(el).attr('class','item active');
        el.emit('move-now');
        animated =true;
        
        window.game.renderDetail(data.item); 
      }

    });
    el.addEventListener('move-out', function () {
      // Create animation.
      animated =false;
      
      d3.select(el).attr('class','item');

    });
  },

 
});
