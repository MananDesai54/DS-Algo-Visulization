var arr1 = [2, 4, 7, 8, 5, 1, 3, 6, 10, 9];
arr1 = [1, 3, 9, 13, 19, 25, 33, 35, 40, 45, 53, 54, 56, 62, 64, 68, 70, 72, 74, 77, 79, 80, 83, 89, 90, 91, 93, 95, 96, 98];
arr1 = [62, 27, 19, 94, 76, 40, 54, 7, 80, 43, 44, 46, 64, 11, 32, 23, 59, 4, 81, 49, 65, 95, 70, 9, 78, 26, 38, 55, 71, 6];
mergeSort1(arr1);
console.log(arr1);
function mergeSort1(array) {
    var len = array.length;
    if (len < 2)
        return;
    var middle = len / 2;
    var left = array.slice(0, middle);
    var right = array.slice(middle, len);
    mergeSort1(left);
    mergeSort1(right);
    merge1(left, right, array);
}
function merge1(left, right, array) {
    var nL = left.length;
    var nR = right.length;
    var i = 0;
    var j = 0;
    var k = 0;
    while (i < nL && j < nR) {
        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        }
        else {
            array[k] = right[j];
            j++;
        }
        k++;
    }
    while (i < nL) {
        array[k] = left[i];
        k++;
        i++;
    }
    while (j < nR) {
        array[k] = right[j];
        k++;
        j++;
    }
}
