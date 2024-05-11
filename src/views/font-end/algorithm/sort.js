
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
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j]; // 交换元素
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        // [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
      }
    }
  }
  return arr;
}
console.log(bubbleSort([5, 3, 8, 1, 2]));


/**
 * 插入排序算法：过构造一个有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
 * @param {Array} arr - 需要排序的数组
 * @return {Array} - 排序后的数组
 * 时间复杂度在最坏的情况下（逆序数组）为 O(n^2)，在最好的情况下（已排序数组）为 O(n)。
 */

function insertionSort(arr) {
  // 遍历数组中的每个元素 ,从第二个元素开始（第一个元素默认视为已排序）
  for (let i = 1; i < arr.length; i++) {
    // 将当前元素存储在临时变量中
    let current = arr[i];
    // 用于记录当前元素应该插入的位置
    let j = i - 1;

    // 检查当前元素是否小于前面的元素，如果是，则将前面的元素后移一位，直到找到正确的位置或到达数组开头。
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }

    // 在找到合适的位置后，将当前元素插入
    arr[j + 1] = current;
  }

  return arr;
}

// 示例
console.log(insertionSort([5, 3, 8, 1, 2]));

/**
 * 选择排序算法：
 * 每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，直到全部待排序的数据元素排完
 *
 * @param {Array} arr 待排序的数组。
 * @return {Array} 排序完成的数组。
 * 时间复杂度始终为 O(n^2)
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

    // 如果找到的最小元素不是当前位置，交换它们
    // if (minIndex !== i) {
    //     [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    //   }
  }

  return arr;
}
console.log(selectionSort([5, 3, 8, 1, 2]));
