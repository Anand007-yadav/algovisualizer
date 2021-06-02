function bubblesort(bar_list) {
   
    var animations = [];
    var going_to = bar_list.length-1;
  
    while (going_to > 1) {
  
      for (var i = 0; i < going_to; i++) {
        if(bar_list[i]['len'] > bar_list[i+1]['len']){
  
          animations.push([i,i+1,"swap"]);
          swap(bar_list,i,i+1);
        }else{
          animations.push([i,i+1,"compare"]);
        }
      }
      going_to--;
    }
  
    return animations;
  
  
    }
  export default bubblesort;
  
  
  function swap(bar_list,index1,index2){
  
    var temp = bar_list[index1];
    bar_list[index1] = bar_list[index2];
    bar_list[index2] = temp;
    bar_list[index1]['id'] = index1;
    bar_list[index2]['id'] = index2;
  
  }