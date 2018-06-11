Picture a map of a battlefield divided into two halves. Points which lie to the left of the line x = 0 are on the forest free side, while points which lie on or to the right of the line are in the forest.

Your army needs to get from point a to point b. The problem is that while point a is located on the forest free side where your army's speed equals v1 miles per hour, point b is located in the forest, where your speed reduces to v2 miles per hour.

Calculate the shortest possible travel time for your army to reach point b.

Example

For a = [-1.5, 0.5], b = [1.5, 1.5], v1 = 4.4 and v2 = 1.1, the output should be
armyMarch(a, b, v1, v2) = 1.761942.

The optimal route is shown below:



Input/Output

[execution time limit] 4 seconds (js)

[input] array.float a

Array of two floats representing coordinates of point a in miles. It is guaranteed that a[0] < 0.

Guaranteed constraints:
-25.0 ≤ a[i] ≤ 35.0.

[input] array.float b

Array of two floats representing coordinates of point b in miles. It is guaranteed that b[0] ≥ 0.

Guaranteed constraints:
-25.0 ≤ b[i] ≤ 35.0.

[input] float v1

A positive float equal to the speed of your army on the forest free side.

Guaranteed constraints:
1.0 ≤ v1 ≤ 4.5.

[input] float v2

A positive float equal to the speed of your army in the forest. It is guaranteed that v1 > v2.

All numbers in inputs are given with at most 5 digits after the decimal point.

Guaranteed constraints:
1.0 ≤ v2 ≤ 4.5.

[output] float

The shortest possible travel time in which your army can reach point b, in hours. Your answer will be considered correct if its absolute error doesn't exceed 10-5.

Your code should run in logarithmic time to pass all the tests, i.e. O(log(|A[1] - B[1]|)).