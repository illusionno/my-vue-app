
const array = [1, 3, 2, 6, 4, 5, 9, 8, 7];
// https://www.runoob.com/w3cnote/bubble-sort.html
/**
 * 实现冒泡排序算法
 * @param {Array} arr - 需要进行排序的数组
 * @return {Array} - 排序后的数组
 */
function bubbleSort(arr) {
    var len = arr.length;
    // 外层循环控制排序的轮数
    for (var i = 0; i < len - 1; i++) {
        // 内层循环控制每轮排序中元素的比较与交换
        for (var j = 0; j < len - 1 - i; j++) {
            // 相邻元素两两比较，如果顺序错误就交换位置
            if (arr[j] > arr[j+1]) {        
                var temp = arr[j];        // 交换元素
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}
/**
 * 插入排序算法，对一个数组进行排序
 * @param {Array} arr - 需要排序的数组
 * @return {Array} - 排序后的数组
 */
function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;

    // 从第二个元素开始遍历数组，将其插入到已排序部分的正确位置
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];

        // 将大于当前元素的元素后移，直到找到合适的位置插入当前元素
        while(preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }

        arr[preIndex+1] = current;
    }
    return arr;
}
/**
 * 选择排序算法
 * 对一个数组进行排序，每次从未排序部分选取最小值，并将其与未排序部分的第一个值交换位置，逐步完成排序。
 * 
 * @param {Array} arr 待排序的数组。
 * @return {Array} 排序完成的数组。
 */
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    
    // 遍历数组，进行排序
    for (var i = 0; i < len - 1; i++) {
        minIndex = i; // 默认当前元素为最小值
        
        // 在剩余未排序部分中寻找最小值
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j; // 更新最小值的索引
            }
        }
        
        // 将找到的最小值与当前元素交换位置
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    
    return arr;
}