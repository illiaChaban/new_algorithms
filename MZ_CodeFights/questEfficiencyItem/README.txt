Sometimes a player is offered so many quests during a game that it's difficult to complete them all. Time is short, and naturally each player wants to complete as many quests as possible while maximizing the points they earn. Here is the scenario:

PlayerOne has a long list of quests, but only timeForQuests hours to complete them. The ith quest should be completed in hi hours, and the reward for it is pointsi. Each quest can be completed only once. Calculate the maximum number of points that PlayerOne can earn.

Example

For h = [1, 4, 2], points = [2, 3, 2] and timeForQuests = 4, the output should be
questEfficiencyItem(h, points, timeForQuests) = 4.

PlayerOne has 4 hours to complete the quests, so it is possible to earn:

2 points for the first quest;
3 points for the second quest;
2 points for the third quest;
2 + 2 = 4 points for the first and the third quests.
So, the maximum number of points PlayerOne can earn is 4.

For h = [1, 4, 2], points = [2, 5, 2] and timeForQuests = 4, the output should be
questEfficiencyItem(h, points, timeForQuests) = 5.

Completing the second quest gives 5 points, which is greater than solving the first and the third quests (2 + 2 = 4 points).

Input/Output

[execution time limit] 4 seconds (js)

[input] array.integer h

Array of positive integers.

Guaranteed constraints:
1 ≤ h.length ≤ 15,
1 ≤ h[i] ≤ 15.

[input] array.integer points

Array of positive integers. The ith element represents the points given upon completion of the ith quest.

Guaranteed constraints:
points.length = h.length,
1 ≤ points[i] ≤ 100.

[input] integer timeForQuests

The number of hours PlayerOne has to complete the quests.

Guaranteed constraints:
4 ≤ timeForQuests ≤ 50.

[output] integer

The maximum number of points PlayerOne can earn.

Your code should run in linear time of the number of quests and timeForQuests to pass all the tests, i.e.
O(h.length * timeForQuests).