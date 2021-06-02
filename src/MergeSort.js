function run_mergesort(bar_list) {
   
    var animations = [];
    
    var arr = [];
    for (var i = 0; i < bar_list.length; i++) {
    
      arr.push(bar_list[i]["len"]);
    }
  
    mergesort(arr, 0, arr.length, animations);
  
    return animations;
  }
  export default run_mergesort;
  
  function mergesort(i, start, end, animations) {
    if (end - start === 1) {
      return i;
    }
  
    var length_of_list = Math.floor((end - start) / 2);
  
    i = mergesort(i, start, start + length_of_list, animations);
    i = mergesort(i, start + length_of_list, end, animations);
  
    i = merge(i, start, start + length_of_list, end, animations);
  
    return i;
  }
  
  function merge(main, start_i, mid_i, end_i, animations) {
    var len_l = mid_i - start_i;
    var len_r = end_i - mid_i;
  
    var i = 0;
    var j = 0;
  
    var result = [];
    var shift_count = 0;
  
    while ((i < len_l) & (j < len_r)) {
  
      if (main[i + start_i] <= main[j + mid_i]) {
  
        result.push(main[i + start_i]);
        animations.push([i + start_i, j + mid_i, "compare"]);
        i += 1;
  
      } else {
  
        result.push(main[j + mid_i]);
        animations.push([i + start_i + shift_count, j + mid_i, "mergesort swap"]);
        shift_count += 1;
        j += 1;
  
      }
    }
  
    while (i < len_l) {
      result.push(main[i + start_i]);
      i += 1;
    }
    while (j < len_r) {
      result.push(main[j + mid_i]);
      j += 1;
    }
  
  
    Array.prototype.splice.apply(main, [start_i, result.length].concat(result));
  
    return main;
  }