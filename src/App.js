import React from "react";
import Bars from "./Bars";
import { Container, Row, Col } from "react-bootstrap";

import run_heapsort from "./HeapSort"
import run_quicksort from "./QuickSort"
import run_mergesort from "./MergeSort"
import selectionsort from "./SelectionSort"
import bubblesort from "./BubbleSort"

var num_bars = 40;
const min_bar = 30;
const max_bar = 450;
const color1 = '#1612a1';
const speed_max = 100;
const highlight_color = "red";

export default class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      bar_list: GenerateBars(num_bars, min_bar, max_bar, 0)
    };

  }

  componentDidMount() {

    this.stopCurrentSort = this.stopCurrentSort.bind(this);
    this.updatebars = this.updatebars.bind(this);
    this.updateBarsFromState = this.updateBarsFromState.bind(this);
    this.clearCounters = this.clearCounters.bind(this);
    this.timeouts = [];
console.log()
  }

  clearCounters = () => {
    document.getElementById('compairsons').innerText = 0;
    document.getElementById('swaps').innerText = 0;
    document.getElementById('total_ops').innerText = 0;
  }

  randomizebars = () => {
    this.stopCurrentSort();
    this.setState({
      bar_list: GenerateBars(40, min_bar, max_bar, 0)
    });
    this.clearCounters();

  }

  updateBarsFromState = () => {

    var bar_docs = document.getElementsByClassName("bar");
    var current_bars = []
    for (var j = 0; j < bar_docs.length; j++) {
      current_bars.push({
        color: bar_docs[j].style.backgroundColor,
        id: j,
        len: parseInt(bar_docs[j].style.height)
      })
    }
    this.setState({bar_list: current_bars});

  }

  stopCurrentSort = () => {

    for (var i = 0; i < this.timeouts.length; i++) {
      clearTimeout(this.timeouts[i]);
    }

    var bar_docs = document.getElementsByClassName("bar");
    for (i = 0; i < bar_docs.length; i++) {
      if (bar_docs[i].style.backgroundColor === highlight_color) {
        bar_docs[i].style.backgroundColor = color1;
      }
    }

    this.updateBarsFromState();
  }


  render() {
    const {bar_list} = this.state;

    return (<section>
      
      
      <Container fluid className="header">
        
        
        <Row>
          <Col  md={6}  xm={{ span: 6, offset: 3 }}id="banner" >
            <h1>Sorting Algorithm Visualizer</h1>
          </Col>
          <Col md={6} xm={{ span: 6, offset: 3 }} id="button_container" >
            <button className="navbar_btn" onClick={() => this.updatebars(selectionsort(JSON.parse(JSON.stringify(this.state.bar_list))))}>Selection Sort</button>
            <button className="navbar_btn" onClick={() => this.updatebars(run_mergesort((JSON.parse(JSON.stringify(this.state.bar_list)))))}>Merge Sort</button>
            <button className="navbar_btn" onClick={() => this.updatebars(run_quicksort((JSON.parse(JSON.stringify(this.state.bar_list)))))}>Quick Sort</button>
            <button className="navbar_btn" onClick={() => this.updatebars(run_heapsort((JSON.parse(JSON.stringify(this.state.bar_list)))))}>Heap Sort</button>
            <button className="navbar_btn" onClick={() => this.updatebars(bubblesort(JSON.parse(JSON.stringify(this.state.bar_list))))}>Bubble Sort</button>
          </Col>
   
        </Row>
        </Container>
        <Container className="bars_and_data_container">
        <Row className="bars_and_data">

         
          < Col  md={8} sm={10} id="bar_container_outer">
            <Bars bar_list={bar_list}/>
          </Col>
            <Col md={4} sm={10} id="data_viz_outer">
            <div id="data_viz">

              <div id="counter_container">
                <div>
                  <div className="data_header">Number of compairsons
                    <div className="data_caption" id="compairsons">0</div>
                  </div>
                </div>
                <div>
                  <div className="data_header">Number of swaps
                    <div className="data_caption" id="swaps">0</div>
                  </div>
                </div>
                <div>
                  <div className="data_header">Total number of operations
                    <div className="data_caption" id="total_ops">0</div>
                  </div>
                </div>
              </div>
              

              <div className="control_button_container">

                <button className="control_button" onClick={() => this.randomizebars()}>Randomize</button>
               
              </div>

            </div>
          </Col> 
        </Row>

        </Container>
     
    </section>);
  } 

  updatebars = (arr) => {


    this.clearCounters();
    this.stopCurrentSort();

    this.timeouts = [];
   

    var bar_docs = document.getElementsByClassName("bar");
    var counter = 0;
    var k = 0;

    var temp;

    var num_compairsons = 0;
    var num_swaps = 0;
    var speed = speed_max;


    while (counter < arr.length) {



      this.timeouts.push(setTimeout(() => {
        var first_index = arr[k][0];
        var second_index = arr[k][1];
       
        if (k > 0) {

          bar_docs[arr[k - 1][0]].style.backgroundColor = color1;
          bar_docs[arr[k - 1][1]].style.backgroundColor = color1;

        }

        if (arr[k][2] === "compare") { 

          
          bar_docs[first_index].style.backgroundColor = highlight_color;
          bar_docs[second_index].style.backgroundColor = highlight_color;

          num_compairsons += 1;
          document.getElementById('compairsons').innerText = num_compairsons;

        } else if (arr[k][2] === "swap") { 

          temp = bar_docs[first_index].style.height;
          bar_docs[first_index].style.height = bar_docs[second_index].style.height;
          bar_docs[second_index].style.height = temp;
         
          bar_docs[first_index].style.backgroundColor = highlight_color;
          bar_docs[second_index].style.backgroundColor = highlight_color;

          num_swaps += 1;
          document.getElementById('swaps').innerText = num_swaps;

        } else if (arr[k][2] === "mergesort swap"){
          
          
          temp = bar_docs[second_index].style.height;

         
            for (var i = second_index; i > first_index; i--) {
                bar_docs[i].style.height = bar_docs[i - 1].style.height;
               
              }
        
          bar_docs[first_index].style.height = temp;

          bar_docs[first_index].style.backgroundColor = highlight_color;
          bar_docs[second_index].style.backgroundColor = highlight_color;


          num_swaps += 1;
          document.getElementById('swaps').innerText = num_swaps;


        }

        if (k === arr.length - 1) {
          
          bar_docs[first_index].style.backgroundColor = color1;
          bar_docs[second_index].style.backgroundColor = color1;
          this.setState({bar_list: set_bar_list(bar_docs)});

        }

        document.getElementById('total_ops').innerText = num_swaps + num_compairsons;

        k++;


      }, counter * speed));
      counter++;
    };

  }

}
function GenerateBars(len, min, max, start) {
  var lst = [];
    for (var i = 0; i < len; i++) {
      var random = getRandomInt(min, max);
      lst.push({
        id: i + start,
        len: random,
        color: color1
      });
    }
  

  return lst;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


function set_bar_list(div_bars){
    var state_bars = [];

    for (var i = 0; i < div_bars.length; i++) {
      console.log((div_bars[i].style.height).slice(0,-2));
      state_bars.push({"color":color1,"id":i,"len":parseInt((div_bars[i].style.height).slice(0,-2))});
    }
    return state_bars
}