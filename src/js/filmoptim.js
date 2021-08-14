(function () {

  document.onreadystatechange = () => {
    
    if (document.readyState === 'complete') {
      
      let el = document.querySelector('#filmoptim');
      let myAnimation = new LazyLinePainter(el, { "ease": "easeLinear", "strokeWidth": 3, "strokeOpacity": 2, "strokeColor": "#ff6b08", "strokeCap": "square", "delay": 200, "repeat": 1000 });
    myAnimation.paint();
     
    }
  };

  })();