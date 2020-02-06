/* global D3 */

// empty object to hold question selection values
let response = {
    gender: '',
    race: '',
    age: ''
};

// load data and call functions once loaded
d3.csv("data/data.csv").then(data => {

    console.log(data);

    // on the last question, select the correct data for the results, and display on the final page
    $(".step3 .answer").click(function(){
        d = selectDataPoint(data, response.gender, response.race, response.age);

        let race;

        //reformat the names for races/ethnicities 
        switch(response.race) {
            case ('native'):
              race = 'Native American'
              break;
            case ('aa'):
              race = 'African American'
              break;
            case ('asian'):
                race = 'Asian'
                break;
            case ('hispanic'):
                race = 'Hispanic/Latino'
                break;
            case ('white'):
                race = "White only (not Hispanic or Latino"
                break;
            default:
              // code block
          }


        $(".result").html(`${parseInt(d)} ${race} ${response.gender}s between ${response.age} years old are under the federal poverty level`)
    });

    
});

// select the data point for the answer
selectDataPoint = (data, gender, race, age) => {
    let match;
    data.forEach(item => {
        if(item.gender == gender) {
            if(item.race == race) {
                if(item.age == age) {
                    match = item['count_below_pov']
                    console.log(match, race, gender, age, `are under the federal poverty level`)
                } 
            }
        }
    })
    return match;
};

// variables to refer to each step in the quiz
let intro = $(".intro");
let step1 = $(".step1");
let step2 = $(".step2");
let step3 = $(".step3");
let step4 = $(".step4");


// variable to refer to body (to change color)
let background = document.querySelector('body');

// variables to refer to each SVG element
let moneySVG = document.querySelector('#money');
let sexSVG = document.querySelector('#sex');
let raceSVG = document.querySelector('#race');
let ageSVG = document.querySelector('#age');
let usdSVG = document.querySelector('#us-dollar');

// click event listener for the start button
let start = $("button[value='start']").click(function(){
    console.log("start clicked!")

    // change the active state from the first step to the second step
    intro.removeClass('active');
    step1.addClass('active');

    // using anime js to move the svg elements 
    anime({
        targets: '#money',
        keyframes: [
            {opacity: 0.5,
            translateX: '20vw'},
            {translateY: 100,
            scale: .65}
          ],
          duration: 400,
        easing: 'spring(1, 80, 10, 0)',
      });

      setTimeout(function(){ sexSVG.style.display = 'block'; }, 500);
    
  });

// click event listener for the gender selection buttons
let genderButtons = $(".gender").click(function(){
    let val = this.value
    console.log(`${val} clicked!`)
    response.gender = val;
    console.log(response);
    step1.removeClass('active');
    step2.addClass('active');

    sexSVG.style.opacity = '0.5';
    raceSVG.style.display = 'block'

    anime({
        targets: '#race',
        translateX: '8vw',
    });

});

// click event listener for the race selection buttons
let raceButtons = $(".race").click(function(){
    let val = this.value
    console.log(`${val} clicked!`)
    response.race = val;
    console.log(response);
    step2.removeClass('active');
    step3.addClass('active');

    raceSVG.style.opacity = '0.5';
    ageSVG.style.display = 'block'

    anime({
        targets: '#age',
        translateX: '16vw',
    });

});

// click event listener for the race selection buttons
let ageButtons = $(".age").click(function(){
    let val = this.value
    console.log(`${val} clicked!`)
    response.age = val;
    console.log(response);
    step3.removeClass('active');
    step4.addClass('active');

    background.style.backgroundColor = 'rgb(39, 87, 90)';

    moneySVG.style.display = 'none';
    sexSVG.style.display = 'none';
    raceSVG.style.display = 'none';
    ageSVG.style.display = 'none';

    usdSVG.style.display = 'block';
    usdSVG.style.top = '100px';
    usdSVG.style.left = '15%';
    usdSVG.style.width = '100px';

});
  
// click event listener for the start again button
let startOver = $("button[value='start-over']").click(function(){
    step4.removeClass('active');
    step1.addClass('active');

    // reset styles and view back to step 1
    background.style.backgroundColor = 'rgb(56, 66, 55)';

    usdSVG.style.display = 'none';
    sexSVG.style.display = 'block';
    sexSVG.style.opacity = '1';
    moneySVG.style.display = 'block';
});




