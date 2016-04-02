export default function (arr, key) {
    Array.prototype.sort.call(arr,(a,b)=>{
      let x = a[key];
      let y = b[key];
      if (x >= y )
        return -1;
      else
        return 1;
    });
}


