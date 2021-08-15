import LazyLinePainter from 'lazy-line-painter';

(function () {

  document.onreadystatechange = () => {
    
    if (document.readyState === 'complete') {
      
        const filmoptim = document.querySelector('#filmoptim');
        const animationFilmoptim = new LazyLinePainter(filmoptim, { "ease": "easeLinear", "strokeWidth": 3, "strokeOpacity": 2, "strokeColor": "#FF6B08", "strokeCap": "square", "delay": 200, "repeat": 1000 });
    
        animationFilmoptim.paint();

        const heart = document.querySelector('#heart');
        const animationHaert = new LazyLinePainter(heart, { "ease": "easeLinear", "strokeWidth": 1, "strokeOpacity": 2, "strokeColor": "#FF6B08", "strokeCap": "round", "repeat": 1000 });
        
        animationHaert.paint();
     
    }
  };

  })();