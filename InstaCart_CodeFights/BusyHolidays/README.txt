To celebrate Cyber Monday, Instacart has decided to give its shoppers (employees that shop at grocery stores and deliver orders to customers) a break. For a 24h period, every shopper only has to make 1 delivery, after which his/her workday is over. However, since providing customers with a reliable shopping experience is Instacart's #1 priority, it is important to ensure that each order is fulfilled and delivered as promised.

You are given a list of orders with the time periods when they should be completed, and the time leadTime it takes to fulfill each order. Knowing the time period each shopper is available (shoppers), find out whether the current number of shoppers is enough to fulfill all orders.

A shopper can fulfill an order if he/she can both start and finish it in the time period specified for this order.

Example

For

shoppers = [["15:10", "16:00"], 
            ["17:40", "22:30"]]
orders = [["17:30", "18:00"], 
          ["15:00", "15:45"]]
and leadTime = [15, 30], the output should be
busyHolidays(shoppers, orders, leadTime) = true.

The first shopper can take the second order, and the second shopper can take the first one.

For

shoppers = [["15:10", "16:00"], 
            ["17:50", "22:30"], 
            ["13:00", "14:40"]]
orders = [["14:30", "15:00"]]
and leadTime = [15], the output should be
busyHolidays(shoppers, orders, leadTime) = false.

None of the shoppers can fulfill the given order. The first two will be unavailable at the time of the order and the last one won't be able to finish it in time, since the earliest time the order can be completed is 14:30 + 15 minutes = 14:45.

Input/Output

[execution time limit] 4 seconds (js)

[input] array.array.string shoppers

Available time for each shopper is given as an array of two strings [from, to], where each string represents time in "hh:mm" format. The shopper is available in the interval from from to to inclusive.
It is guaranteed that both from and to refer to the same day, and thus from < to in terms of time.

Guaranteed constraints:
2 ≤ shoppers.length ≤ 40.

[input] array.array.string orders

For each order the period in which it should be fulfilled is given in the same format as the availability of each shopper.

Guaranteed constraints:
1 ≤ orders.length ≤ 40,

[input] array.integer leadTime

Array of positive integers of the same length as orders. leadTime[i] is the number of minutes required to fulfill the ith order.

Guaranteed constraints:
leadTime.length = orders.length,
1 ≤ leadTime[i] ≤ 1000.

[output] boolean

true if the shoppers can fulfill each order, false otherwise.