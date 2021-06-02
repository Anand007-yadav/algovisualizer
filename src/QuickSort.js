function run_quicksort(bar_list){

    var animations = [];
    
    var arr = [];
    for (var i = 0; i < bar_list.length; i++) {
      
      arr.push(bar_list[i]["len"]);
    }

    quicksort(arr, 0, arr.length - 1, animations);

    return animations;


}
export default run_quicksort;


function quicksort(a, start, end, animations) {

  if (start >= end) {
    return a;
  }

  var partition_index = partition(a, start, end, animations);

  a = quicksort(a, start, partition_index - 1, animations);
  a = quicksort(a, partition_index + 1, end, animations);


  return a;
}



function partition(a, start, end, animations){

  var pivot = a[end];
  var p_index = start;


  for (var i = start; i < end; i++) {
    if (a[i] < pivot) {
      swap(a,i,p_index);
      animations.push([p_index,i,"swap"])
      p_index += 1;
    }else{
      animations.push([i,end,"compare"])
    }
  }
  swap(a,p_index,end);
  animations.push([p_index,end,"swap"])

  return(p_index)
}

function swap(a, first, second){
  var temp = a[first];
  a[first] = a[second];
  a[second] = temp;
}