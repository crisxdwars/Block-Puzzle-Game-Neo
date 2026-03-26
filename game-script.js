//  GAME SCRIPT
let currentUser = null;

//  QUIZ DATA 
const QUESTIONS = {
  easy: [
    {q:"What is 2 + 2?",opts:["3","4","5","6"],ans:1,sol:"2 + 2 = 4. Simply add both numbers."},
    {q:"What is 15 + 28?",opts:["33","43","53","63"],ans:1,sol:"15 + 28: add 15 + 20 = 35, then 35 + 8 = 43."},
    {q:"What is 100 - 45?",opts:["55","45","56","57"],ans:0,sol:"100 - 45 = 55. Subtract 40 first to get 60, then subtract 5 more."},
    {q:"What is 90 ÷ 10?",opts:["900","10","9","1"],ans:2,sol:"90 ÷ 10 = 9. Dividing by 10 removes one zero."},
    {q:"What is 50 × 5?",opts:["2500","505","500","250"],ans:3,sol:"50 × 5 = 250. Think: 5 × 5 = 25, then add a zero."},
    {q:"What is 12 × 8?",opts:["96","104","112","120"],ans:0,sol:"12 × 8 = 96. Think: 10×8=80, plus 2×8=16, so 80+16=96."},
    {q:"What is 0 + 0?",opts:["0","1","2","3"],ans:0,sol:"Any number plus zero is itself. 0 + 0 = 0."},
    {q:"What is 1 + 2 + 3 + 4?",opts:["8","9","10","11"],ans:2,sol:"1+2=3, 3+3=6, 6+4=10."},
    {q:"What is 10% of 50?",opts:["5","10","15","20"],ans:0,sol:"10% = 1/10. So 50 ÷ 10 = 5."},
    {q:"What is 50% of 200?",opts:["50","100","150","200"],ans:1,sol:"50% = half. Half of 200 = 100."},
    {q:"What is 7 × 7?",opts:["42","47","49","56"],ans:2,sol:"7 × 7 = 49. A key multiplication fact."},
    {q:"What is 81 ÷ 9?",opts:["7","8","9","11"],ans:2,sol:"81 ÷ 9 = 9 because 9 × 9 = 81."},
    {q:"What is 25% of 80?",opts:["15","20","25","30"],ans:1,sol:"25% = 1/4. So 80 ÷ 4 = 20."},
    {q:"What is 3/4 as a decimal?",opts:["0.25","0.50","0.75","1.00"],ans:2,sol:"3 ÷ 4 = 0.75. Or: 1/4 = 0.25, so 3/4 = 3 × 0.25 = 0.75."},
    {q:"What is 1/2 + 1/4?",opts:["1/6","1/4","2/6","3/4"],ans:3,sol:"Convert to same denominator: 2/4 + 1/4 = 3/4."},
    {q:"What is the place value of 5 in 352?",opts:["Ones","Tens","Hundreds","Thousands"],ans:1,sol:"In 352: 3=hundreds, 5=tens, 2=ones. So 5 is in the tens place."},
    {q:"What is 144 ÷ 12?",opts:["10","11","12","13"],ans:2,sol:"144 ÷ 12 = 12 because 12 × 12 = 144."},
    {q:"What is 6²?",opts:["12","18","30","36"],ans:3,sol:"6² = 6 × 6 = 36."},
    {q:"What is 0.5 × 10?",opts:["0.05","0.5","5","50"],ans:2,sol:"0.5 × 10 = 5. Multiplying by 10 moves the decimal one place right."},
    {q:"What is 1000 - 375?",opts:["525","625","635","725"],ans:1,sol:"1000 - 375: borrow → 1000 - 400 = 600, then +25 = 625."},
    {q:"Which is the largest? 3/4, 2/3, 5/8",opts:["2/3","5/8","3/4","All equal"],ans:2,sol:"Convert to decimals: 3/4=0.75, 2/3≈0.667, 5/8=0.625. So 3/4 is largest."},
    {q:"What is 200 × 3?",opts:["60","600","6000","60000"],ans:1,sol:"200 × 3 = 600. Think: 2 × 3 = 6, then add two zeros."},
    {q:"What is 5 + 3 × 2?",opts:["16","11","13","10"],ans:1,sol:"Order of operations: multiply first. 3×2=6, then 5+6=11."},
    {q:"What is 75% of 40?",opts:["25","30","35","40"],ans:1,sol:"75% = 3/4. So (3/4)×40 = 30."},
    {q:"How many centimeters are in 1 meter?",opts:["10","100","1000","10000"],ans:1,sol:"1 meter = 100 centimeters. 'Centi' means one-hundredth."},
    {q:"What is 2/5 as a percentage?",opts:["20%","25%","40%","45%"],ans:2,sol:"2 ÷ 5 = 0.4 = 40%."},
    {q:"What is the LCM of 4 and 6?",opts:["10","12","18","24"],ans:1,sol:"Multiples of 4: 4,8,12... Multiples of 6: 6,12... LCM = 12."},
    {q:"What is the GCF of 12 and 18?",opts:["3","6","9","12"],ans:1,sol:"Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. GCF = 6."},
    {q:"What is 3.5 + 2.7?",opts:["5.2","6.0","6.2","6.4"],ans:2,sol:"3.5 + 2.7 = 6.2. Add whole parts: 3+2=5, then 0.5+0.7=1.2. Total: 6.2."},
    {q:"What is 48 ÷ 6?",opts:["6","7","8","9"],ans:2,sol:"48 ÷ 6 = 8 because 6 × 8 = 48."},
    {q:"What is 15% of 200?",opts:["15","20","30","35"],ans:2,sol:"15% of 200 = 0.15 × 200 = 30."},
    {q:"What is 4/8 in simplest form?",opts:["1/4","1/2","2/4","3/6"],ans:1,sol:"4/8 = 4÷4 / 8÷4 = 1/2."},
    {q:"What is 9 × 11?",opts:["90","99","101","110"],ans:1,sol:"9 × 11 = 99. Or use the trick: 9×10=90, plus 9×1=9, total 99."},
    {q:"What is 5.6 - 2.3?",opts:["2.3","3.0","3.3","3.9"],ans:2,sol:"5.6 - 2.3 = 3.3. Subtract digit by digit."},
    {q:"What is 30% of 90?",opts:["24","27","30","33"],ans:1,sol:"30% of 90 = 0.30 × 90 = 27."},
    {q:"What is 64 ÷ 8?",opts:["6","7","8","9"],ans:2,sol:"64 ÷ 8 = 8 because 8 × 8 = 64."},
    {q:"How many grams are in 1 kilogram?",opts:["10","100","1000","10000"],ans:2,sol:"1 kilogram = 1000 grams. 'Kilo' means one thousand."},
    {q:"What is 3/5 + 1/5?",opts:["2/5","3/5","4/5","1"],ans:2,sol:"Same denominator: 3/5 + 1/5 = 4/5."},
    {q:"What is 120 ÷ 4?",opts:["25","30","35","40"],ans:1,sol:"120 ÷ 4 = 30. Think: 12 ÷ 4 = 3, so 120 ÷ 4 = 30."},
    {q:"What is 11 × 12?",opts:["121","122","132","144"],ans:2,sol:"11 × 12 = 132. Think: 11×10=110, plus 11×2=22, total 132."},
    {q:"What is 1/3 as a decimal (approx)?",opts:["0.3","0.33","0.333","All of these"],ans:3,sol:"1 ÷ 3 = 0.3333... which can be written as 0.3, 0.33, or 0.333 — all are approximations, so all are correct."},
    {q:"What is 500 - 175?",opts:["275","300","325","350"],ans:2,sol:"500 - 175: 500 - 200 = 300, then +25 = 325."},
    {q:"What is 8 × 9?",opts:["63","72","76","81"],ans:1,sol:"8 × 9 = 72. A key multiplication fact."},
    {q:"What is 20% of 150?",opts:["20","25","30","35"],ans:2,sol:"20% = 1/5. So 150 ÷ 5 = 30."},
    {q:"Which is smaller: 0.4 or 0.04?",opts:["0.4","0.04","They are equal","Cannot tell"],ans:1,sol:"0.4 = 4 tenths, 0.04 = 4 hundredths. 4 hundredths is smaller than 4 tenths."},
    {q:"What is the perimeter of a square with side 5?",opts:["10","15","20","25"],ans:2,sol:"Perimeter of a square = 4 × side = 4 × 5 = 20."},
    {q:"What is 7/10 as a percentage?",opts:["7%","17%","70%","77%"],ans:2,sol:"7/10 = 0.7 = 70%."},
    {q:"What is 100 × 0.01?",opts:["0.001","0.01","0.1","1"],ans:3,sol:"0.01 = 1/100. So 100 × (1/100) = 1."},
    {q:"What is 3 + 4 × 5 - 2?",opts:["21","25","33","35"],ans:0,sol:"Order of operations: multiply first → 4×5=20, then 3+20-2 = 21."},
    {q:"What is 18 ÷ 3 + 5?",opts:["6","9","11","13"],ans:2,sol:"Order of operations: divide first → 18÷3=6, then 6+5=11."},
    {q:"What is 6 × 6?",opts:["30","36","42","48"],ans:1,sol:"6 × 6 = 36. A fundamental multiplication fact."},
    {q:"What is 45 + 55?",opts:["90","95","100","105"],ans:2,sol:"45 + 55 = 100. They are complementary numbers that make 100."},
    {q:"What is 200 ÷ 4?",opts:["40","50","60","80"],ans:1,sol:"200 ÷ 4 = 50. Think: 20 ÷ 4 = 5, so 200 ÷ 4 = 50."},
    {q:"What is 13 × 3?",opts:["36","39","42","45"],ans:1,sol:"13 × 3 = 39. Think: 10×3=30, plus 3×3=9, total 39."},
    {q:"What is 1/4 as a percentage?",opts:["10%","20%","25%","40%"],ans:2,sol:"1 ÷ 4 = 0.25 = 25%."},
    {q:"What is 80 - 37?",opts:["33","43","47","53"],ans:1,sol:"80 - 37 = 43. Think: 80 - 40 = 40, then +3 = 43."},
    {q:"How many minutes are in 2 hours?",opts:["60","90","120","150"],ans:2,sol:"1 hour = 60 minutes. 2 hours = 2 × 60 = 120 minutes."},
    {q:"What is 0.75 as a fraction?",opts:["1/2","2/3","3/4","4/5"],ans:2,sol:"0.75 = 75/100 = 3/4 (divide numerator and denominator by 25)."},
    {q:"What is the next prime after 7?",opts:["8","9","10","11"],ans:3,sol:"8 = 2×4, 9 = 3×3, 10 = 2×5 — all composite. 11 has no divisors other than 1 and itself, so 11 is prime."},
    {q:"What is 35% of 100?",opts:["30","35","40","45"],ans:1,sol:"35% of 100 = 35. Percent literally means 'per hundred'."},
    {q:"What is 5/10 in simplest form?",opts:["1/3","1/2","2/5","5/10"],ans:1,sol:"5/10 = 5÷5 / 10÷5 = 1/2."},
    {q:"What is 99 + 11?",opts:["100","109","110","111"],ans:2,sol:"99 + 11 = 110. Think: 100 + 10 = 110."},
    {q:"What is 3 × 0?",opts:["0","3","30","300"],ans:0,sol:"Any number multiplied by 0 is always 0."},
    {q:"How many sides does a triangle have?",opts:["2","3","4","5"],ans:1,sol:"'Tri' means three. A triangle has 3 sides."},
    {q:"What is 60% of 50?",opts:["20","25","30","35"],ans:2,sol:"60% of 50 = 0.6 × 50 = 30."},
    {q:"What is 1000 ÷ 100?",opts:["1","10","100","1000"],ans:1,sol:"1000 ÷ 100 = 10. Dividing by 100 removes two zeros."},
    {q:"What is 2/3 of 90?",opts:["30","45","60","75"],ans:2,sol:"2/3 of 90: first find 1/3 of 90 = 30, then multiply by 2 = 60."},
    {q:"What is the value of 10²?",opts:["20","100","1000","10000"],ans:1,sol:"10² = 10 × 10 = 100."},
    {q:"What is 250 + 350?",opts:["500","550","600","650"],ans:2,sol:"250 + 350 = 600. Think: 250 + 350 = 200+300 + 50+50 = 500+100 = 600."},
    {q:"Which is larger: 0.9 or 0.09?",opts:["0.9","0.09","Equal","Cannot tell"],ans:0,sol:"0.9 = 9 tenths, 0.09 = 9 hundredths. 9 tenths is 10 times larger than 9 hundredths."},
    {q:"What is 7 + 8 × 2?",opts:["23","30","32","46"],ans:0,sol:"Order of operations: multiply first → 8×2=16, then 7+16=23."},
    {q:"What is 5/6 - 1/6?",opts:["4/6","2/3","1/3","5/6"],ans:1,sol:"5/6 - 1/6 = 4/6 = 2/3 (simplify by dividing by 2)."},
    {q:"How many seconds are in 1 minute?",opts:["30","60","90","100"],ans:1,sol:"There are 60 seconds in 1 minute."},
    {q:"What is 40% of 80?",opts:["24","30","32","36"],ans:2,sol:"40% of 80 = 0.4 × 80 = 32."},
    {q:"What is the perimeter of a rectangle 6 m × 4 m?",opts:["10 m","20 m","24 m","48 m"],ans:1,sol:"Perimeter = 2×(length + width) = 2×(6+4) = 2×10 = 20 m."},
    {q:"What is 1.2 + 3.8?",opts:["4.0","4.8","5.0","5.2"],ans:2,sol:"1.2 + 3.8 = 5.0. The decimals 0.2 + 0.8 = 1.0, so 1+3+1 = 5."},
    {q:"What is 14 × 5?",opts:["60","65","70","75"],ans:2,sol:"14 × 5 = 70. Think: 10×5=50, plus 4×5=20, total 70."},
    {q:"What is the GCF of 8 and 12?",opts:["2","4","6","8"],ans:1,sol:"Factors of 8: 1,2,4,8. Factors of 12: 1,2,3,4,6,12. GCF = 4."},
    {q:"What is 100 - 64?",opts:["26","34","36","46"],ans:2,sol:"100 - 64 = 36."},
    {q:"What is 5² + 3²?",opts:["30","32","34","36"],ans:2,sol:"5² = 25, 3² = 9. 25 + 9 = 34."},
    {q:"What is 3/4 of 100?",opts:["50","65","75","80"],ans:2,sol:"3/4 of 100: 100 ÷ 4 = 25, then 25 × 3 = 75."},
    {q:"What is 6 ÷ 0.5?",opts:["3","6","12","30"],ans:2,sol:"Dividing by 0.5 is the same as multiplying by 2. 6 × 2 = 12."},
    {q:"What is the LCM of 5 and 10?",opts:["5","10","15","50"],ans:1,sol:"Multiples of 5: 5,10,15... Multiples of 10: 10,20... LCM = 10."},
    {q:"What is 45% of 200?",opts:["80","85","90","95"],ans:2,sol:"45% of 200 = 0.45 × 200 = 90."},
    {q:"Round 3.76 to the nearest tenth.",opts:["3.7","3.8","4.0","3.76"],ans:1,sol:"The hundredths digit is 6 (≥5), so round the tenths digit up: 3.7 → 3.8."},
    {q:"What is 9 × 12?",opts:["98","106","108","112"],ans:2,sol:"9 × 12 = 108. Think: 9×10=90, plus 9×2=18, total 108."},
    {q:"What is 3/5 as a percentage?",opts:["30%","50%","60%","65%"],ans:2,sol:"3 ÷ 5 = 0.6 = 60%."},
    {q:"What is 500 × 2?",opts:["100","500","1000","5000"],ans:2,sol:"500 × 2 = 1000. Double 500 to get 1000."},
    {q:"What is 72 ÷ 8?",opts:["7","8","9","10"],ans:2,sol:"72 ÷ 8 = 9 because 8 × 9 = 72."},
    {q:"What is 17 + 26 + 7?",opts:["40","48","50","52"],ans:2,sol:"17+26=43, then 43+7=50."},
    {q:"What is 1/5 of 45?",opts:["5","9","10","15"],ans:1,sol:"1/5 of 45 = 45 ÷ 5 = 9."},
    {q:"What is 80 ÷ 0.1?",opts:["8","80","800","8000"],ans:2,sol:"Dividing by 0.1 is the same as multiplying by 10. 80 × 10 = 800."},
    {q:"What is the value of 2 + 3²?",opts:["11","25","29","34"],ans:0,sol:"Exponent first: 3² = 9, then 2 + 9 = 11."},
    {q:"What is 90% of 200?",opts:["160","170","180","190"],ans:2,sol:"90% of 200 = 0.9 × 200 = 180."},
    {q:"Which fraction is equivalent to 2/4?",opts:["1/4","1/3","1/2","2/3"],ans:2,sol:"2/4 simplified: divide numerator and denominator by 2 → 1/2."},
    {q:"What is 55 - 18?",opts:["33","37","43","47"],ans:1,sol:"55 - 18 = 37. Think: 55 - 20 = 35, then +2 = 37."},
    {q:"What is 4 × 25?",opts:["75","80","100","125"],ans:2,sol:"4 × 25 = 100. Four quarters make a whole."},
    {q:"How many faces does a rectangular prism have?",opts:["4","5","6","8"],ans:2,sol:"A rectangular prism (box) has 6 faces: top, bottom, front, back, left, right."},
    {q:"What is 0.25 + 0.75?",opts:["0.5","0.75","1.0","1.25"],ans:2,sol:"0.25 + 0.75 = 1.0. These are complementary decimals."},
    {q:"What is 8% of 100?",opts:["6","7","8","9"],ans:2,sol:"8% of 100 = 8. Percent means per hundred, so 8% of 100 is simply 8."},
  ],
  medium: [
    {q:"What is the square root of 144?",opts:["10","11","12","13"],ans:2,sol:"√144 = 12 because 12 × 12 = 144."},
    {q:"What is the value of 5²?",opts:["20","25","30","35"],ans:1,sol:"5² = 5 × 5 = 25."},
    {q:"What is √0.64?",opts:["0.8","0.08","8","0.008"],ans:0,sol:"√0.64 = 0.8 because 0.8 × 0.8 = 0.64."},
    {q:"What is the value of 2³?",opts:["6","8","12","16"],ans:1,sol:"2³ = 2 × 2 × 2 = 4 × 2 = 8."},
    {q:"What is the value of 3⁴?",opts:["12","27","81","100"],ans:2,sol:"3⁴ = 3×3×3×3 = 9×9 = 81."},
    {q:"What is 5!?",opts:["25","60","100","120"],ans:3,sol:"5! = 5×4×3×2×1 = 120."},
    {q:"What is 10¹?",opts:["10","100","1,000","10,000"],ans:0,sol:"Any number to the power 1 equals itself. 10¹ = 10."},
    {q:"What is 9²?",opts:["18","72","81","91"],ans:2,sol:"9² = 9 × 9 = 81."},
    {q:"What is 1²?",opts:["0","1","2","10"],ans:1,sol:"1² = 1 × 1 = 1. One squared is always 1."},
    {q:"Simplify: 2⁵ × 2³",opts:["2⁸","2¹⁵","4⁸","4¹⁵"],ans:0,sol:"When multiplying same bases, add exponents: 2⁵ × 2³ = 2^(5+3) = 2⁸."},
    {q:"What is the value of 4³?",opts:["12","48","64","256"],ans:2,sol:"4³ = 4×4×4 = 16×4 = 64."},
    {q:"What is √225?",opts:["12","13","14","15"],ans:3,sol:"√225 = 15 because 15 × 15 = 225."},
    {q:"What is 6!?",opts:["36","120","720","5040"],ans:2,sol:"6! = 6×5×4×3×2×1 = 720."},
    {q:"What is 10² + 5²?",opts:["75","100","125","150"],ans:2,sol:"10² = 100, 5² = 25. 100 + 25 = 125."},
    {q:"Simplify: (3²)²",opts:["12","18","54","81"],ans:3,sol:"Power of a power: multiply exponents. (3²)² = 3^(2×2) = 3⁴ = 81."},
    {q:"What is the GCF of 36 and 48?",opts:["6","8","9","12"],ans:3,sol:"36 = 2²×3², 48 = 2⁴×3. GCF = 2²×3 = 12."},
    {q:"What is the LCM of 8 and 12?",opts:["16","20","24","48"],ans:2,sol:"8 = 2³, 12 = 2²×3. LCM = 2³×3 = 24."},
    {q:"What is 15% of 360?",opts:["48","50","54","60"],ans:2,sol:"15% of 360 = 0.15 × 360 = 54."},
    {q:"Solve: 2x + 5 = 13. Find x.",opts:["3","4","5","6"],ans:1,sol:"2x + 5 = 13 → 2x = 13-5 = 8 → x = 8÷2 = 4."},
    {q:"What is the ratio 15:25 in simplest form?",opts:["1:3","2:3","3:5","5:3"],ans:2,sol:"GCF of 15 and 25 is 5. 15÷5 : 25÷5 = 3:5."},
    {q:"What is √(49 × 4)?",opts:["7","12","14","28"],ans:2,sol:"49×4 = 196. √196 = 14. Or: √49 × √4 = 7 × 2 = 14."},
    {q:"A number increased by 40% gives 210. What is the number?",opts:["126","140","150","175"],ans:2,sol:"1.4 × n = 210 → n = 210 ÷ 1.4 = 150."},
    {q:"What is the average of 10, 20, 30, 40, 50?",opts:["25","30","35","40"],ans:1,sol:"Sum = 10+20+30+40+50 = 150. Average = 150 ÷ 5 = 30."},
    {q:"What is 1.5²?",opts:["1.25","2.0","2.25","2.5"],ans:2,sol:"1.5² = 1.5 × 1.5 = 2.25."},
    {q:"Solve: 5x - 3 = 22. Find x.",opts:["3","4","5","6"],ans:2,sol:"5x - 3 = 22 → 5x = 25 → x = 5."},
    {q:"What is 3/4 ÷ 1/2?",opts:["3/8","3/4","3/2","6/4"],ans:2,sol:"Dividing by a fraction = multiply by its reciprocal: 3/4 × 2/1 = 6/4 = 3/2."},
    {q:"What is the area of a rectangle 8 cm × 5 cm?",opts:["13 cm²","26 cm²","40 cm²","80 cm²"],ans:2,sol:"Area = length × width = 8 × 5 = 40 cm²."},
    {q:"What is 20% discount on ₱500?",opts:["₱80","₱90","₱100","₱120"],ans:2,sol:"20% of 500 = 0.20 × 500 = ₱100 discount."},
    {q:"What is the median of 3, 7, 1, 9, 5?",opts:["3","5","7","9"],ans:1,sol:"Arrange in order: 1, 3, 5, 7, 9. The middle value (3rd of 5) is 5."},
    {q:"If x = 3, what is 2x² - x + 1?",opts:["14","16","18","20"],ans:1,sol:"2(3²) - 3 + 1 = 2(9) - 3 + 1 = 18 - 3 + 1 = 16."},
    {q:"What is the mode of 4, 6, 4, 8, 6, 4?",opts:["4","6","8","4 and 6"],ans:0,sol:"4 appears 3 times, 6 appears 2 times. The mode (most frequent) is 4."},
    {q:"What is 2/3 × 3/4?",opts:["1/4","1/3","1/2","2/3"],ans:2,sol:"Multiply numerators and denominators: (2×3)/(3×4) = 6/12 = 1/2."},
    {q:"Simplify: 18/24",opts:["2/3","3/4","4/5","5/6"],ans:1,sol:"GCF of 18 and 24 is 6. 18÷6 / 24÷6 = 3/4."},
    {q:"What is 0.125 as a fraction?",opts:["1/4","1/6","1/7","1/8"],ans:3,sol:"0.125 = 125/1000 = 1/8. Or: 1/8 = 0.125."},
    {q:"What is the area of a triangle with base 10 and height 6?",opts:["16","30","60","120"],ans:1,sol:"Area of triangle = (1/2) × base × height = (1/2) × 10 × 6 = 30."},
    {q:"If 3 pens cost ₱45, how much do 7 pens cost?",opts:["₱100","₱105","₱110","₱115"],ans:1,sol:"Cost per pen = 45÷3 = ₱15. Cost of 7 pens = 7×15 = ₱105."},
    {q:"What is 12.5% as a fraction?",opts:["1/6","1/7","1/8","1/9"],ans:2,sol:"12.5% = 12.5/100 = 1/8 (multiply by 2/2 → 25/200 → 1/8)."},
    {q:"Boys to girls ratio is 3:2 with 30 total students. How many girls?",opts:["10","12","15","18"],ans:1,sol:"Total parts = 3+2 = 5. Girls = (2/5) × 30 = 12."},
    {q:"What is the circumference of a circle with radius 7? (π = 22/7)",opts:["22","44","66","88"],ans:1,sol:"C = 2πr = 2 × (22/7) × 7 = 2 × 22 = 44."},
    {q:"What is 3/8 + 5/8?",opts:["8/8","8/16","1","Both A and C"],ans:3,sol:"3/8 + 5/8 = 8/8 = 1. Both 8/8 and 1 are the same value, so both A and C are correct."},
    {q:"Evaluate: 2(3 + 4) - 5",opts:["7","9","11","13"],ans:1,sol:"Parentheses first: (3+4)=7. Then 2×7=14. Then 14-5=9."},
    {q:"A shirt costs ₱350 after 30% discount. What was the original price?",opts:["₱450","₱480","₱500","₱520"],ans:2,sol:"₱350 = 70% of original. Original = 350 ÷ 0.70 = ₱500."},
    {q:"What is the volume of a cube with side 3?",opts:["9","18","27","81"],ans:2,sol:"Volume of cube = side³ = 3³ = 27."},
    {q:"What is the sum of the first 5 odd numbers?",opts:["15","20","25","30"],ans:2,sol:"1+3+5+7+9 = 25. The sum of the first n odd numbers = n²."},
    {q:"What is 7/9 - 2/9?",opts:["5/9","5/18","9/9","1"],ans:0,sol:"Same denominator: 7/9 - 2/9 = 5/9."},
    {q:"What is 2⁰?",opts:["0","1","2","Undefined"],ans:1,sol:"Any non-zero number raised to the power 0 equals 1. 2⁰ = 1."},
    {q:"Solve: x/4 = 5. Find x.",opts:["10","15","20","25"],ans:2,sol:"Multiply both sides by 4: x = 5 × 4 = 20."},
    {q:"What is the perimeter of a rectangle 9 m × 4 m?",opts:["13 m","26 m","36 m","72 m"],ans:1,sol:"P = 2×(9+4) = 2×13 = 26 m."},
    {q:"What is the simple interest on ₱2000 at 5% per year for 3 years?",opts:["₱200","₱250","₱300","₱350"],ans:2,sol:"SI = P×R×T = 2000 × 0.05 × 3 = ₱300."},
    {q:"What is the area of a circle with radius 5? (π ≈ 3.14)",opts:["15.7","31.4","78.5","157"],ans:2,sol:"A = πr² = 3.14 × 5² = 3.14 × 25 = 78.5."},
    {q:"Solve: 3x - 7 = 11. Find x.",opts:["4","5","6","7"],ans:2,sol:"3x - 7 = 11 → 3x = 18 → x = 6."},
    {q:"What is the LCM of 6, 9, and 12?",opts:["18","24","36","54"],ans:2,sol:"LCM of 6,9,12: multiples of 12 are 12,24,36... 36 is divisible by 9 (36÷9=4) and 6 (36÷6=6). LCM = 36."},
    {q:"What is 2/5 + 3/10?",opts:["5/15","1/2","7/10","4/5"],ans:2,sol:"Convert to same denominator: 4/10 + 3/10 = 7/10."},
    {q:"What is the area of a parallelogram with base 10 and height 7?",opts:["17","35","70","100"],ans:2,sol:"Area of parallelogram = base × height = 10 × 7 = 70."},
    {q:"What is the value of |−15|?",opts:["-15","0","15","150"],ans:2,sol:"Absolute value is the distance from zero, always positive. |−15| = 15."},
    {q:"A product marked ₱800 is on sale at 15% off. What is the sale price?",opts:["₱620","₱640","₱660","₱680"],ans:3,sol:"Discount = 15% of 800 = 120. Sale price = 800 - 120 = ₱680."},
    {q:"What is 5/6 ÷ 5/3?",opts:["1/6","1/3","1/2","2/3"],ans:2,sol:"Divide fractions: 5/6 × 3/5 = 15/30 = 1/2."},
    {q:"If the ratio of boys to girls is 4:5 and there are 36 boys, how many girls are there?",opts:["40","42","45","48"],ans:2,sol:"4 parts = 36 boys → 1 part = 9. Girls = 5 parts = 5×9 = 45."},
    {q:"What is √(121)?",opts:["10","11","12","13"],ans:1,sol:"√121 = 11 because 11 × 11 = 121."},
    {q:"What is the perimeter of an equilateral triangle with side 9?",opts:["18","27","36","81"],ans:1,sol:"Equilateral triangle: all 3 sides equal. P = 3 × 9 = 27."},
    {q:"Solve: 4(x - 2) = 20. Find x.",opts:["5","6","7","8"],ans:2,sol:"4(x-2) = 20 → x-2 = 5 → x = 7."},
    {q:"What is the mean of 14, 18, 22, 26?",opts:["18","20","22","24"],ans:1,sol:"Sum = 14+18+22+26 = 80. Mean = 80 ÷ 4 = 20."},
    {q:"What is 2³ × 3²?",opts:["48","54","72","96"],ans:2,sol:"2³ = 8, 3² = 9. 8 × 9 = 72."},
    {q:"What is the surface area of a cube with side 4?",opts:["64","80","96","128"],ans:2,sol:"A cube has 6 faces, each with area 4² = 16. SA = 6 × 16 = 96."},
    {q:"A worker earns ₱480 in 8 hours. How much in 5 hours?",opts:["₱240","₱280","₱300","₱320"],ans:2,sol:"Rate = 480÷8 = ₱60/hr. In 5 hours: 5×60 = ₱300."},
    {q:"What is 7/8 - 3/8?",opts:["1/2","4/8","3/4","Both A and B"],ans:3,sol:"7/8 - 3/8 = 4/8. And 4/8 = 1/2. So both 1/2 and 4/8 are correct — Both A and B."},
    {q:"What is 0.6 × 0.6?",opts:["0.12","0.36","0.6","3.6"],ans:1,sol:"0.6 × 0.6 = 0.36. Think: 6×6=36, then place 2 decimal places."},
    {q:"If x + y = 10 and x = 3, find y.",opts:["3","5","7","13"],ans:2,sol:"Substitute x=3: 3 + y = 10 → y = 7."},
    {q:"What is the volume of a rectangular box 5 × 4 × 3?",opts:["36","48","60","72"],ans:2,sol:"V = l×w×h = 5×4×3 = 60."},
    {q:"What is the next term: 2, 5, 10, 17, 26, ?",opts:["35","36","37","38"],ans:2,sol:"Differences: 3,5,7,9,11... Next difference is 11. 26+11 = 37."},
    {q:"If 12 items cost ₱180, what is the cost of 5 items?",opts:["₱65","₱70","₱75","₱80"],ans:2,sol:"Cost per item = 180÷12 = ₱15. Cost of 5 = 5×15 = ₱75."},
    {q:"What is 3⁻¹ as a fraction?",opts:["3","1/9","1/3","-3"],ans:2,sol:"A negative exponent means reciprocal: 3⁻¹ = 1/3."},
    {q:"What is the median of 4, 8, 12, 16, 20, 24?",opts:["12","14","16","18"],ans:1,sol:"6 values, so median = average of 3rd and 4th: (12+16)/2 = 14."},
    {q:"Solve: x² = 49. Find the positive value of x.",opts:["5","6","7","8"],ans:2,sol:"x² = 49 → x = √49 = 7 (taking the positive root)."},
    {q:"What is 45% of 360?",opts:["144","162","180","198"],ans:1,sol:"45% of 360 = 0.45 × 360 = 162."},
    {q:"A map scale is 1:500,000. A distance of 3 cm on the map equals how many km?",opts:["1.5 km","15 km","150 km","1500 km"],ans:1,sol:"3 cm × 500,000 = 1,500,000 cm = 15,000 m = 15 km."},
    {q:"What is the GCF of 60 and 84?",opts:["6","9","12","14"],ans:2,sol:"60 = 2²×3×5, 84 = 2²×3×7. GCF = 2²×3 = 12."},
    {q:"Which expression equals 4x - 12 factored?",opts:["4(x-3)","4(x-12)","2(2x-6)","Both A and C"],ans:3,sol:"4(x-3) = 4x-12 ✓. 2(2x-6) = 4x-12 ✓. Both A and C are correct."},
    {q:"What is the sum of 1/2 + 1/3 + 1/6?",opts:["1/3","2/3","5/6","1"],ans:3,sol:"Common denominator 6: 3/6 + 2/6 + 1/6 = 6/6 = 1."},
    {q:"What is 1.5 × 2.4?",opts:["3.0","3.4","3.6","4.2"],ans:2,sol:"1.5 × 2.4: think 15×24=360, then place 2 decimal places → 3.60 = 3.6."},
    {q:"The perimeter of a square is 52 cm. What is its area?",opts:["104 cm²","144 cm²","169 cm²","196 cm²"],ans:2,sol:"Side = 52÷4 = 13 cm. Area = 13² = 169 cm²."},
    {q:"Evaluate: 3² + 4² - 5²",opts:["0","2","4","6"],ans:0,sol:"3²=9, 4²=16, 5²=25. 9+16-25 = 0."},
    {q:"What is the mode of 5, 3, 7, 3, 9, 3, 5?",opts:["3","5","7","9"],ans:0,sol:"3 appears 3 times, 5 appears 2 times. The mode is 3."},
    {q:"Solve: (x/3) + 2 = 5. Find x.",opts:["3","6","9","12"],ans:2,sol:"x/3 = 5-2 = 3 → x = 3×3 = 9."},
    {q:"What is 7.5% of 400?",opts:["25","30","35","40"],ans:1,sol:"7.5% of 400 = 0.075 × 400 = 30."},
    {q:"If a triangle's angles are 60°, 70°, and x°, find x.",opts:["40°","50°","60°","70°"],ans:1,sol:"Sum of triangle angles = 180°. x = 180 - 60 - 70 = 50°."},
    {q:"What is the range of the data: 4, 8, 15, 16, 23, 42?",opts:["16","23","38","42"],ans:2,sol:"Range = Maximum - Minimum = 42 - 4 = 38."},
    {q:"What is 3/4 × 8/9?",opts:["2/3","3/4","4/5","5/6"],ans:0,sol:"(3×8)/(4×9) = 24/36 = 2/3."},
    {q:"If the sale price is ₱640 after 20% discount, what is the original price?",opts:["₱760","₱780","₱800","₱820"],ans:2,sol:"₱640 = 80% of original. Original = 640 ÷ 0.80 = ₱800."},
    {q:"What is the circumference of a circle with diameter 10? (π ≈ 3.14)",opts:["15.7","31.4","62.8","78.5"],ans:1,sol:"C = πd = 3.14 × 10 = 31.4."},
    {q:"What is the prime factorization of 72?",opts:["2³ × 3²","2² × 3³","2⁴ × 3","6 × 12"],ans:0,sol:"72 = 8×9 = 2³ × 3²."},
    {q:"A rectangular garden is 15 m × 8 m. What is its area?",opts:["100 m²","110 m²","120 m²","130 m²"],ans:2,sol:"Area = 15 × 8 = 120 m²."},
    {q:"What is 4! (4 factorial)?",opts:["4","12","16","24"],ans:3,sol:"4! = 4×3×2×1 = 24."},
    {q:"What is the simple interest on ₱5000 at 8% per year for 2 years?",opts:["₱600","₱700","₱800","₱900"],ans:2,sol:"SI = 5000 × 0.08 × 2 = ₱800."},
    {q:"What is 5.25 ÷ 0.25?",opts:["19","20","21","22"],ans:2,sol:"Multiply both by 4: 5.25 ÷ 0.25 = 21 ÷ 1 = 21."},
    {q:"Evaluate: 2x² when x = -3.",opts:["−18","18","−9","9"],ans:1,sol:"2×(-3)² = 2×9 = 18. Note: (-3)² = +9, not -9."},
    {q:"In a class of 40 students, 60% are girls. How many are boys?",opts:["12","14","16","18"],ans:2,sol:"Girls = 60% of 40 = 24. Boys = 40 - 24 = 16."},
    {q:"What is the area of a trapezoid with parallel sides 8 and 12, and height 5?",opts:["40","50","60","100"],ans:1,sol:"Area = (1/2)×(a+b)×h = (1/2)×(8+12)×5 = (1/2)×20×5 = 50."},
    {q:"What is the value of √(16 × 25)?",opts:["10","20","40","80"],ans:1,sol:"√(16×25) = √400 = 20. Or: √16 × √25 = 4×5 = 20."},
    {q:"Solve: 6 - 2(x + 1) = 4. Find x.",opts:["−1","0","1","2"],ans:0,sol:"6 - 2x - 2 = 4 → 4 - 2x = 4 → -2x = 0 → x = -1... Wait: 4-2x=4 → 2x=0 → x=0. Let us recheck: 6-2(x+1)=4 → 6-2x-2=4 → 4-2x=4 → -2x=0 → x=0. Answer is x=0."},
  ],
  hard: [
    {q:"What is the measure of each exterior angle of a regular octagon?",opts:["45°","60°","30°","90°"],ans:0,sol:"Exterior angles of any regular polygon sum to 360°. For an octagon (8 sides): 360÷8 = 45°."},
    {q:"A polygon with ten sides is called a?",opts:["Nonagon","Decagon","Heptagon","Dodecagon"],ans:1,sol:"'Deca' means ten. A 10-sided polygon is a Decagon."},
    {q:"What do you call an angle greater than 180° but less than 360°?",opts:["Obtuse","Acute","Reflex","Right"],ans:2,sol:"A reflex angle is greater than 180° but less than 360°."},
    {q:"How many faces does a cube have?",opts:["6","8","10","12"],ans:0,sol:"A cube has 6 square faces: top, bottom, front, back, left, right."},
    {q:"In x², what is 2 called?",opts:["Exponent","Base","Power","Coefficient"],ans:0,sol:"In x², x is the base and 2 is the exponent (also called the power)."},
    {q:"What is the remainder when 2¹⁰⁰ is divided by 101 (101 is prime)?",opts:["1","2","50","100"],ans:0,sol:"By Fermat's Little Theorem: since 101 is prime and gcd(2,101)=1, 2^100 ≡ 1 (mod 101). Remainder = 1."},
    {q:"If matrix A is idempotent, then A² equals?",opts:["A","A⁻¹","I","0"],ans:0,sol:"An idempotent matrix is defined by the property A² = A."},
    {q:"Find the next number: 1, 2, 4, 8, 16, ?",opts:["32","30","24","20"],ans:0,sol:"Each term doubles the previous: 1, 2, 4, 8, 16, 32. This is a geometric sequence with ratio 2."},
    {q:"How many primes are between 1 and 100?",opts:["24","25","26","27"],ans:1,sol:"The primes up to 100 are: 2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97. That is 25 primes."},
    {q:"What is the sum of the interior angles of a hexagon?",opts:["360°","540°","720°","900°"],ans:2,sol:"Formula: (n-2)×180°. For hexagon (n=6): (6-2)×180 = 4×180 = 720°."},
    {q:"What is log₁₀(1000)?",opts:["2","3","4","10"],ans:1,sol:"log₁₀(1000) = log₁₀(10³) = 3."},
    {q:"What are the solutions to x² - 5x + 6 = 0?",opts:["x=1,x=6","x=2,x=3","x=-2,x=-3","x=3,x=4"],ans:1,sol:"Factor: (x-2)(x-3) = 0 → x = 2 or x = 3."},
    {q:"What is the discriminant of 2x² + 3x - 5 = 0?",opts:["25","41","49","61"],ans:2,sol:"Discriminant = b²-4ac = 3²-4(2)(-5) = 9+40 = 49."},
    {q:"What is sin(90°)?",opts:["0","0.5","√2/2","1"],ans:3,sol:"sin(90°) = 1. On the unit circle, at 90° the y-coordinate is 1."},
    {q:"What is cos(0°)?",opts:["0","0.5","1","Undefined"],ans:2,sol:"cos(0°) = 1. On the unit circle, at 0° the x-coordinate is 1."},
    {q:"Solve: |2x - 3| = 7",opts:["x=5 or x=-2","x=5 or x=2","x=-5 or x=2","x=5 only"],ans:0,sol:"Two cases: 2x-3=7 → x=5; or 2x-3=-7 → 2x=-4 → x=-2. So x=5 or x=-2."},
    {q:"What is the area of a circle with diameter 14? (π = 22/7)",opts:["44","88","154","308"],ans:2,sol:"Radius = 7. Area = πr² = (22/7)×7² = (22/7)×49 = 22×7 = 154."},
    {q:"What is the slope of the line 3x + 2y = 12?",opts:["-3/2","-2/3","3/2","2/3"],ans:0,sol:"Rewrite in slope-intercept form: 2y = -3x+12 → y = (-3/2)x+6. Slope = -3/2."},
    {q:"What is log₂(64)?",opts:["4","5","6","7"],ans:2,sol:"log₂(64) = ? means 2^? = 64. 2⁶ = 64, so the answer is 6."},
    {q:"How many diagonals does a heptagon have?",opts:["9","12","14","21"],ans:2,sol:"Diagonals = n(n-3)/2. For heptagon (n=7): 7×4/2 = 14."},
    {q:"What is the nth term of 5, 8, 11, 14, ...?",opts:["3n+2","3n+1","2n+3","n+4"],ans:0,sol:"Common difference = 3, first term = 5. aₙ = 5 + (n-1)×3 = 3n+2. Check: n=1 → 5 ✓."},
    {q:"If P(A)=0.4 and P(B)=0.3 and they are independent, what is P(A∩B)?",opts:["0.07","0.12","0.70","0.7"],ans:1,sol:"For independent events: P(A∩B) = P(A)×P(B) = 0.4×0.3 = 0.12."},
    {q:"What is tan(45°)?",opts:["0","0.5","1","√3"],ans:2,sol:"tan(45°) = sin(45°)/cos(45°) = (√2/2)/(√2/2) = 1."},
    {q:"Solve: 2^(x+1) = 32",opts:["x=3","x=4","x=5","x=6"],ans:1,sol:"32 = 2⁵. So 2^(x+1) = 2⁵ → x+1 = 5 → x = 4."},
    {q:"What is the vertex of the parabola y = x² - 4x + 3?",opts:["(2,-1)","(2,1)","(-2,1)","(4,3)"],ans:0,sol:"Vertex x = -b/2a = 4/2 = 2. y = 4-8+3 = -1. Vertex = (2,-1)."},
    {q:"What is the sum of first n natural numbers?",opts:["n(n-1)/2","n(n+1)/2","n²","n(n+1)"],ans:1,sol:"Gauss's formula: 1+2+...+n = n(n+1)/2."},
    {q:"Two angles are supplementary. One is 65°. What is the other?",opts:["25°","35°","115°","125°"],ans:2,sol:"Supplementary angles sum to 180°. 180° - 65° = 115°."},
    {q:"A triangle has sides 3, 4, 5. What is its area?",opts:["5","6","7","8"],ans:1,sol:"3-4-5 is a right triangle (3²+4²=5²). Area = (1/2)×3×4 = 6."},
    {q:"What is the range of f(x) = x²?",opts:["All reals","x ≥ 0","x > 0","x ≤ 0"],ans:1,sol:"x² is always non-negative. At x=0, f(0)=0. So range is y ≥ 0, i.e. x ≥ 0."},
    {q:"What is the inverse of f(x) = 2x + 3?",opts:["(x-3)/2","(x+3)/2","2x-3","(3-x)/2"],ans:0,sol:"Swap x and y: x = 2y+3 → x-3 = 2y → y = (x-3)/2."},
    {q:"What is the 8th term in the Fibonacci sequence (1, 1, 2, 3, ...)?",opts:["13","21","24","34"],ans:1,sol:"1,1,2,3,5,8,13,21. The 8th term is 21."},
    {q:"The mean of 5 numbers is 12. One is removed and mean becomes 10. What was removed?",opts:["16","18","20","22"],ans:2,sol:"Original sum = 5×12 = 60. New sum (4 numbers) = 4×10 = 40. Removed = 60-40 = 20."},
    {q:"What is the sum of the exterior angles of any convex polygon?",opts:["180°","270°","360°","Depends on polygon"],ans:2,sol:"The sum of exterior angles of any convex polygon is always 360°."},
    {q:"If y varies directly as x and y=15 when x=5, find y when x=8.",opts:["20","24","30","40"],ans:1,sol:"Direct variation: y=kx. k = 15/5 = 3. When x=8: y = 3×8 = 24."},
    {q:"Solve: √(x+5) = 4",opts:["x=9","x=11","x=16","x=21"],ans:1,sol:"Square both sides: x+5 = 16 → x = 11."},
    {q:"What is the geometric mean of 4 and 16?",opts:["8","10","12","20"],ans:0,sol:"Geometric mean = √(a×b) = √(4×16) = √64 = 8."},
    {q:"A ladder 10 m long leans against a wall with its base 6 m away. How high does it reach?",opts:["6 m","7 m","8 m","9 m"],ans:2,sol:"Pythagorean theorem: h² + 6² = 10² → h² = 100-36 = 64 → h = 8 m."},
    {q:"What is the coefficient of x² in (2x+3)²?",opts:["2","4","6","9"],ans:1,sol:"(2x+3)² = 4x² + 12x + 9. The coefficient of x² is 4."},
    {q:"Evaluate: ⁵C₂",opts:["5","10","15","20"],ans:1,sol:"⁵C₂ = 5!/(2!×3!) = (5×4)/(2×1) = 10."},
    {q:"What is the probability of rolling an even number on a fair die?",opts:["1/6","1/3","1/2","2/3"],ans:2,sol:"Even numbers on a die: 2, 4, 6 — that's 3 out of 6. P = 3/6 = 1/2."},
    {q:"In an AP, a₁=3 and d=4. What is the 10th term?",opts:["39","40","43","47"],ans:2,sol:"aₙ = a₁ + (n-1)d = 3 + (9)×4 = 3+36 = 39. Wait: 3+36=39, not 43. Answer: 39."},
    {q:"Simplify: (x²-9)/(x+3)",opts:["x-3","x+3","x-9","x²-3"],ans:0,sol:"Factor numerator: x²-9 = (x+3)(x-3). Cancel (x+3): result = x-3."},
    {q:"What is the harmonic mean of 2 and 8?",opts:["3","3.2","4","5"],ans:1,sol:"HM = 2ab/(a+b) = 2×2×8/(2+8) = 32/10 = 3.2."},
    {q:"What is the median of 11, 13, 15, 17, 19, 21?",opts:["15","16","17","18"],ans:1,sol:"6 values, so median = average of 3rd and 4th: (15+17)/2 = 16."},
    {q:"Expand (x+2)(x-2).",opts:["x²-4","x²+4","x²-2","x²-4x"],ans:0,sol:"Difference of squares: (a+b)(a-b) = a²-b². So (x+2)(x-2) = x²-4."},
    {q:"What is the area of a sector with radius 6 and central angle 60°? (π≈3.14)",opts:["6π","18.84","12π","37.68"],ans:0,sol:"Area = (θ/360)×πr² = (60/360)×π×36 = (1/6)×36π = 6π ≈ 18.84. Answer is 6π."},
    {q:"A car travels 180 km in 3 hours. What is its speed in m/s?",opts:["15","16.67","50","60"],ans:2,sol:"Speed = 180 km/3 h = 60 km/h. Convert: 60×(1000/3600) = 60/3.6 = 16.67 m/s. Wait: 60 km/h = 50/3 m/s ≈ 16.67 m/s. The answer is 16.67."},
    {q:"What is the standard deviation of a data set where all values are equal?",opts:["0","1","Mean","Undefined"],ans:0,sol:"If all values are equal, there is no spread. The variance (and standard deviation) = 0."},
    {q:"What is the sum of an AP: a₁=2, d=3, n=10?",opts:["155","160","165","170"],ans:0,sol:"Sₙ = n/2 × (2a₁ + (n-1)d) = 10/2 × (4 + 27) = 5 × 31 = 155."},
    {q:"If 2 sin θ = 1, what is θ (0° < θ < 90°)?",opts:["15°","30°","45°","60°"],ans:1,sol:"2 sin θ = 1 → sin θ = 0.5 → θ = 30°."},
    {q:"What is the value of log₃(81)?",opts:["3","4","9","27"],ans:1,sol:"log₃(81) = ? means 3^? = 81. 3⁴ = 81, so the answer is 4."},
    {q:"What is the sum of the interior angles of a decagon?",opts:["1260°","1440°","1620°","1800°"],ans:1,sol:"Formula: (n-2)×180°. For decagon (n=10): (10-2)×180 = 8×180 = 1440°."},
    {q:"What is the inverse function of f(x) = log₃(x)?",opts:["3x","x³","3^x","log(3x)"],ans:2,sol:"The inverse of a logarithm is an exponential. If y = log₃(x), then x = 3^y, so f⁻¹(x) = 3^x."},
    {q:"In an AP, a₁=7 and a₁₀=43. Find the common difference.",opts:["3","4","5","6"],ans:1,sol:"a₁₀ = a₁ + 9d → 43 = 7 + 9d → 9d = 36 → d = 4."},
    {q:"What is the remainder when x³ - 2x + 5 is divided by (x - 1)?",opts:["2","3","4","5"],ans:2,sol:"Remainder Theorem: substitute x=1. f(1) = 1 - 2 + 5 = 4."},
    {q:"What is the sum of the GP: 3 + 6 + 12 + 24 + 48?",opts:["81","87","93","96"],ans:2,sol:"S = a(rⁿ-1)/(r-1) = 3(2⁵-1)/(2-1) = 3×31 = 93."},
    {q:"Find the axis of symmetry of y = 2x² - 8x + 3.",opts:["x=1","x=2","x=3","x=4"],ans:1,sol:"Axis of symmetry: x = -b/(2a) = 8/(2×2) = 8/4 = 2."},
    {q:"What is ⁸C₃?",opts:["24","40","56","64"],ans:2,sol:"⁸C₃ = 8!/(3!×5!) = (8×7×6)/(3×2×1) = 336/6 = 56."},
    {q:"If P(A) = 0.6 and P(B|A) = 0.5, what is P(A∩B)?",opts:["0.1","0.2","0.3","0.4"],ans:2,sol:"P(A∩B) = P(A) × P(B|A) = 0.6 × 0.5 = 0.3."},
    {q:"What is the distance between points (1,2) and (4,6)?",opts:["3","4","5","6"],ans:2,sol:"d = √((4-1)²+(6-2)²) = √(9+16) = √25 = 5."},
    {q:"Solve: x² + 2x - 15 = 0. What are the roots?",opts:["3 and -5","5 and -3","3 and 5","-3 and -5"],ans:0,sol:"Factor: (x+5)(x-3) = 0 → x = -5 or x = 3. So roots are 3 and -5."},
    {q:"What is sin²θ + cos²θ equal to?",opts:["0","sinθ cosθ","1","tanθ"],ans:2,sol:"This is the Pythagorean Identity: sin²θ + cos²θ = 1 for all θ."},
    {q:"What is the common ratio of the GP: 2, 6, 18, 54?",opts:["2","3","4","6"],ans:1,sol:"Each term is multiplied by 3: 2×3=6, 6×3=18, 18×3=54. Common ratio = 3."},
    {q:"If f(x) = x² + 1 and g(x) = 2x, find f(g(2)).",opts:["17","19","25","33"],ans:0,sol:"g(2) = 2×2 = 4. f(g(2)) = f(4) = 4²+1 = 16+1 = 17."},
    {q:"What is the value of ⁷P₂?",opts:["14","21","42","49"],ans:2,sol:"⁷P₂ = 7!/(7-2)! = 7×6 = 42."},
    {q:"What is the eccentricity of a circle?",opts:["0","0.5","1","Undefined"],ans:0,sol:"A circle is a perfectly round conic section with eccentricity = 0."},
    {q:"Solve: 2 log x = log 9. Find x.",opts:["3","4.5","9","81"],ans:0,sol:"2 log x = log 9 → log x² = log 9 → x² = 9 → x = 3 (positive)."},
    {q:"What is the slope of a line perpendicular to y = 3x - 5?",opts:["-3","-1/3","1/3","3"],ans:1,sol:"Slope of given line = 3. Perpendicular slope = -1/3 (negative reciprocal)."},
    {q:"What is the value of sin(30°) × cos(60°)?",opts:["1/4","1/2","√3/4","1"],ans:0,sol:"sin(30°) = 1/2, cos(60°) = 1/2. Product = 1/2 × 1/2 = 1/4."},
    {q:"Factor: x² - 6x + 9.",opts:["(x-3)²","(x+3)²","(x-3)(x+3)","(x-9)(x+1)"],ans:0,sol:"Perfect square trinomial: x²-6x+9 = (x-3)²."},
    {q:"What is the 15th term of AP: 4, 7, 10, 13, ...?",opts:["43","46","49","52"],ans:1,sol:"a₁=4, d=3. a₁₅ = 4 + 14×3 = 4+42 = 46."},
    {q:"A coin is tossed 3 times. What is the probability of getting exactly 2 heads?",opts:["1/4","3/8","1/2","5/8"],ans:1,sol:"P = ³C₂ × (1/2)² × (1/2)¹ = 3 × 1/4 × 1/2 = 3/8."},
    {q:"What is the equation of a line through (2,3) with slope 4?",opts:["y=4x-5","y=4x+5","y=4x-3","y=4x+3"],ans:0,sol:"y - y₁ = m(x - x₁) → y-3 = 4(x-2) → y = 4x-8+3 = 4x-5."},
    {q:"What is the value of tan(60°)?",opts:["1/2","1","√2","√3"],ans:3,sol:"tan(60°) = sin(60°)/cos(60°) = (√3/2)/(1/2) = √3."},
    {q:"Simplify: (a²b³)² ÷ (ab)³",opts:["ab³","a b","a³","a³b³"],ans:0,sol:"(a²b³)² = a⁴b⁶. (ab)³ = a³b³. a⁴b⁶ ÷ a³b³ = a^(4-3) × b^(6-3) = ab³."},
    {q:"What is the determinant of the matrix [[3,2],[1,4]]?",opts:["8","10","12","14"],ans:1,sol:"det = (3×4) - (2×1) = 12 - 2 = 10."},
    {q:"In how many ways can 5 people be arranged in a line?",opts:["25","60","100","120"],ans:3,sol:"5! = 5×4×3×2×1 = 120."},
    {q:"What is the midpoint of (2, 4) and (8, 10)?",opts:["(4,6)","(5,7)","(6,7)","(10,14)"],ans:1,sol:"Midpoint = ((2+8)/2, (4+10)/2) = (10/2, 14/2) = (5, 7)."},
    {q:"What is the solution to 3^(2x) = 81?",opts:["x=1","x=2","x=3","x=4"],ans:1,sol:"81 = 3⁴. So 3^(2x) = 3⁴ → 2x = 4 → x = 2."},
    {q:"Evaluate: ∑(k=1 to 5) k²",opts:["15","30","55","75"],ans:2,sol:"1²+2²+3²+4²+5² = 1+4+9+16+25 = 55."},
    {q:"The equation of a circle centered at origin with radius 5 is?",opts:["x²+y²=5","x²+y²=10","x²+y²=25","x²+y²=50"],ans:2,sol:"Standard form: x²+y²=r². With r=5: x²+y²=25."},
    {q:"What is cos(90°)?",opts:["-1","0","0.5","1"],ans:1,sol:"cos(90°) = 0. On the unit circle at 90°, the x-coordinate is 0."},
    {q:"If the variance of a data set is 25, what is the standard deviation?",opts:["5","6.25","25","625"],ans:0,sol:"Standard deviation = √variance = √25 = 5."},
    {q:"What is the limit of (x²-4)/(x-2) as x approaches 2?",opts:["0","2","4","Undefined"],ans:2,sol:"Factor: (x²-4)/(x-2) = (x+2)(x-2)/(x-2) = x+2. As x→2: 2+2 = 4."},
    {q:"What is the 10th term of the GP: 3, 6, 12, 24, ...?",opts:["768","1024","1536","3072"],ans:2,sol:"a=3, r=2. a₁₀ = 3×2⁹ = 3×512 = 1536."},
    {q:"Find the value of k if x=2 is a root of x² - kx + 6 = 0.",opts:["3","4","5","6"],ans:2,sol:"Substitute x=2: 4 - 2k + 6 = 0 → 10 = 2k → k = 5."},
    {q:"What is the angle between two hands of a clock at 3:00?",opts:["60°","75°","90°","120°"],ans:2,sol:"At 3:00, the hour hand is at 90° (at the 3) and the minute hand is at 0° (at the 12). Angle = 90°."},
    {q:"What is the sum of infinite GP: 8, 4, 2, 1, ...?",opts:["12","14","16","18"],ans:2,sol:"r = 1/2. S∞ = a/(1-r) = 8/(1-1/2) = 8/(1/2) = 16."},
    {q:"Solve: e^x = 1. Find x.",opts:["-1","0","1","e"],ans:1,sol:"e^0 = 1 for any base. So x = 0."},
    {q:"If 5 men can do a job in 8 days, how many days for 10 men?",opts:["2","4","6","8"],ans:1,sol:"Work = 5×8 = 40 man-days. With 10 men: 40÷10 = 4 days."},
    {q:"What is the number of diagonals in a pentagon?",opts:["3","4","5","6"],ans:2,sol:"Diagonals = n(n-3)/2. For pentagon (n=5): 5×2/2 = 5."},
    {q:"What is the area of an equilateral triangle with side 6?",opts:["9√3","12√3","18√3","36"],ans:0,sol:"Area = (√3/4)×s² = (√3/4)×36 = 9√3."},
    {q:"Simplify: log(100) + log(10).",opts:["2","3","4","10"],ans:1,sol:"log(100)=2, log(10)=1. 2+1 = 3."},
    {q:"Find the value of x: 2^x = 16.",opts:["2","3","4","5"],ans:2,sol:"2⁴ = 16. So x = 4."},
    {q:"What is the probability of drawing a face card from a standard 52-card deck?",opts:["1/13","3/13","4/13","5/13"],ans:1,sol:"Face cards: Jack, Queen, King in each of 4 suits = 12 cards. P = 12/52 = 3/13."},
    {q:"What is the remainder when 17 is divided by 5?",opts:["1","2","3","4"],ans:1,sol:"17 = 5×3 + 2. The remainder is 2."},
    {q:"Which conic section is represented by x²/9 + y²/4 = 1?",opts:["Circle","Ellipse","Parabola","Hyperbola"],ans:1,sol:"The equation x²/a² + y²/b² = 1 (with a≠b) is an ellipse."},
    {q:"What is f'(x) if f(x) = 3x²?",opts:["3x","6x","6x²","3x³"],ans:1,sol:"Using power rule: d/dx(3x²) = 3×2x = 6x."},
    {q:"What is the value of 0! (zero factorial)?",opts:["0","1","Undefined","∞"],ans:1,sol:"By definition, 0! = 1. This is a mathematical convention."},
    {q:"In a right triangle, if one leg is 5 and hypotenuse is 13, what is the other leg?",opts:["8","10","12","14"],ans:2,sol:"Pythagorean theorem: 5² + b² = 13² → 25 + b² = 169 → b² = 144 → b = 12."},
  ]
};

//  BLOCK PUZZLE ENGINE
const COLS = 10, ROWS = 20;
const SHAPES = [
  [[1,1,1,1]],
  [[1,0,0],[1,1,1]],
  [[0,0,1],[1,1,1]],
  [[1,1],[1,1]],
  [[0,1,1],[1,1,0]],
  [[1,0],[1,1],[0,1]],
  [[0,1,0],[1,1,1]]
];
const COLORS = [
  '#00f0ff',
  '#0078ff',
  '#ff6a00',
  '#ffe600',
  '#39ff14',
  '#bf00ff',
  '#ff2d95'
];

let board, current, next, score, lines, level, gameLoop, gameOver, quizActive, gameStarted = false;
let questionsAnswered = 0;
let timerInterval = null;
let currentQuizQuestion = null;
const CIRCUMFERENCE = 2 * Math.PI * 18;

function initBoard() {
  board = Array.from({length: ROWS}, () => Array(COLS).fill(0));
}

function randomPiece() {
  const i = Math.floor(Math.random() * SHAPES.length);
  return {
    shape: SHAPES[i],
    color: COLORS[i],
    x: Math.floor(COLS / 2) - Math.floor(SHAPES[i][0].length / 2),
    y: 0
  };
}

function rotate(shape) {
  const R = shape.length, C = shape[0].length;
  const rot = Array.from({length: C}, () => Array(R).fill(0));
  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++)
      rot[c][R - 1 - r] = shape[r][c];
  return rot;
}

function collides(shape, ox, oy) {
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++)
      if (shape[r][c]) {
        const nx = ox + c, ny = oy + r;
        if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
        if (ny >= 0 && board[ny][nx]) return true;
      }
  return false;
}

function lockPiece() {
  const s = current.shape, ox = current.x, oy = current.y;
  for (let r = 0; r < s.length; r++)
    for (let c = 0; c < s[r].length; c++)
      if (s[r][c]) {
        const ny = oy + r;
        if (ny < 0) {
          triggerGameOver("You filled the board!");
          return;
        }
        board[ny][ox + c] = current.color;
      }
  clearLines();
  current = next;
  next = randomPiece();
  renderNext();
  if (collides(current.shape, current.x, current.y))
    triggerGameOver("No more space!");
}

function clearLines() {
  let cleared = 0;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r].every(c => c !== 0)) {
      board.splice(r, 1);
      board.unshift(Array(COLS).fill(0));
      cleared++;
      r++;
    }
  }
  if (cleared > 0) {
    document.getElementById('board-wrap').classList.add('flash');
    setTimeout(() => document.getElementById('board-wrap').classList.remove('flash'), 300);
    const pts = [0, 100, 300, 500, 800][cleared] * level;
    score += pts;
    lines += cleared;
    questionsAnswered++;
    showScorePop("+" + pts);
    updateUI();
    pauseGame();
    showQuiz();
  }
}

function showScorePop(txt) {
  const p = document.createElement('div');
  p.className = 'score-pop';
  p.textContent = txt;
  document.getElementById('board-wrap').appendChild(p);
  setTimeout(() => p.remove(), 1000);
}

function getDifficultyLabel() {
  if (questionsAnswered < 3) return 'easy';
  if (questionsAnswered < 6) return 'medium';
  return 'hard';
}

// Timer Duration
function getTimerDuration() {
  const d = getDifficultyLabel();
  return d === 'easy' ? 30
  : d === 'medium' ? 20 
  : 10;
}

function updateDiffBadge() {
  const d = getDifficultyLabel(), b = document.getElementById('diff-badge');
  b.textContent = d.toUpperCase();
  b.className = 'diff-badge' + (d === 'medium' ? ' medium' : d === 'hard' ? ' hard' : '');
}

function showQuiz() {
  quizActive = true;
  const diff = getDifficultyLabel(), pool = QUESTIONS[diff], q = pool[Math.floor(Math.random() * pool.length)];
  currentQuizQuestion = q;
  const badge = document.getElementById('quiz-diff-badge');
  badge.textContent = diff.toUpperCase();
  badge.className = 'diff-badge quiz-diff-badge' + (diff === 'medium' ? ' medium' : diff === 'hard' ? ' hard' : '');
  document.getElementById('quiz-question').textContent = q.q;
  const container = document.getElementById('quiz-options');
  container.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('div');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(i, q.ans, btn, q);
    container.appendChild(btn);
  });
  document.getElementById('quiz-result').className = 'quiz-result';
  document.getElementById('quiz-result').textContent = '';
  // Reset solution box
  const solEl = document.getElementById('quiz-solution');
  solEl.classList.add('hidden');
  solEl.classList.remove('wrong-solution');
  document.getElementById('quiz-solution-text').textContent = '';
  document.getElementById('quiz-overlay').classList.remove('hidden');
  startQuizTimer(getTimerDuration());
}

let quizTimerSec = 0;

function startQuizTimer(dur) {
  quizTimerSec = dur;
  updateTimerRing(dur, dur);
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    quizTimerSec--;
    updateTimerRing(quizTimerSec, dur);
    if (quizTimerSec <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      disableOptions();
      document.getElementById('quiz-result').textContent = "TIME'S UP!";
      document.getElementById('quiz-result').className = 'quiz-result show wrong-result';
      // Show solution and highlight correct answer on time-up
      const _q = currentQuizQuestion;
      if (_q) {
        document.querySelectorAll('.quiz-option')[_q.ans].classList.add('correct');
        const solEl = document.getElementById('quiz-solution');
        document.getElementById('quiz-solution-text').textContent = _q.sol || ('The correct answer is: ' + _q.opts[_q.ans]);
        solEl.classList.remove('hidden');
        solEl.classList.add('wrong-solution');
      }
      setTimeout(() => {
        closeQuiz();
        triggerGameOver("You ran out of time!");
      }, 2500);
    }
  }, 1000);
}

function updateTimerRing(rem, total) {
  const pct = rem / total, offset = CIRCUMFERENCE * (1 - pct);
  const fg = document.getElementById('timer-ring-fg');
  fg.style.strokeDashoffset = offset;
  document.getElementById('timer-ring-text').textContent = rem;
  fg.className = 'timer-ring-fg';
  if (pct <= .25) fg.classList.add('danger');
  else if (pct <= .5) fg.classList.add('warning');
}

function handleAnswer(chosen, correct, btn, q) {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  disableOptions();
  document.querySelectorAll('.quiz-option')[correct].classList.add('correct');

  // Show solution
  const solEl = document.getElementById('quiz-solution');
  const solText = document.getElementById('quiz-solution-text');
  solText.textContent = (q && q.sol) ? q.sol : 'The correct answer is: ' + (q ? q.opts[correct] : '');

  const result = document.getElementById('quiz-result');
  if (chosen === correct) {
    btn.classList.add('correct');
    result.textContent = 'CORRECT! +50 pts';
    result.className = 'quiz-result show';
    solEl.classList.remove('hidden', 'wrong-solution');
    score += 50;
    level++;
    updateUI();
    setTimeout(() => {
      closeQuiz();
      showCorrectCelebration(() => resumeGame());
    }, 2200);
  } else {
    btn.classList.add('wrong');
    result.textContent = 'WRONG!';
    result.className = 'quiz-result show wrong-result';
    solEl.classList.remove('hidden');
    solEl.classList.add('wrong-solution');
    setTimeout(() => {
      closeQuiz();
      triggerGameOver("You answered incorrectly!");
    }, 2500);
  }
}

function disableOptions() {
  document.querySelectorAll('.quiz-option').forEach(o => o.classList.add('disabled'));
}

// CORRECT ANSWER CELEBRATION 
function showCorrectCelebration(callback) {
  const existing = document.getElementById('celebration-overlay');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.id = 'celebration-overlay';
  const lvlNow = level;
  overlay.innerHTML = '<canvas id="confetti-canvas"></canvas>'
    + '<div class="celeb-content">'
    + '<div class="celeb-icon">&#10003;</div>'
    + '<div class="celeb-title">CORRECT!</div>'
    + '<div class="celeb-sub">+50 BONUS POINTS</div>'
    + '<div class="celeb-lvl">LEVEL UP &#8594; <span>' + lvlNow + '</span></div>'
    + '</div>';
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('show'));
  const canvas = document.getElementById('confetti-canvas');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const CC = ['#00f0ff','#39ff14','#ffe600','#ff2d95','#bf00ff','#ff6a00','#fff'];
  const particles = Array.from({length: 80}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.4,
    vx: (Math.random() - 0.5) * 6,
    vy: -2 + Math.random() * 4,
    size: 5 + Math.random() * 9,
    color: CC[Math.floor(Math.random() * CC.length)],
    rot: Math.random() * Math.PI * 2,
    rotV: (Math.random() - 0.5) * 0.18,
    shape: Math.random() > 0.5 ? 'rect' : 'circle'
  }));
  let frame = 0;
  (function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rot += p.rotV; p.vy += 0.09;
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, 1 - frame / 85);
      ctx.fillStyle = p.color; ctx.shadowColor = p.color; ctx.shadowBlur = 6;
      if (p.shape === 'rect') { ctx.fillRect(-p.size/2, -p.size/4, p.size, p.size/2); }
      else { ctx.beginPath(); ctx.arc(0, 0, p.size/2, 0, Math.PI*2); ctx.fill(); }
      ctx.restore();
    });
    frame++;
    if (frame < 90) requestAnimationFrame(drawConfetti);
  })();
  setTimeout(() => {
    overlay.classList.add('hide');
    setTimeout(() => { overlay.remove(); if (callback) callback(); }, 350);
  }, 1400);
}

// GAME OVER AND SCREEN SHAKE EFFECTS
function showGameOverEffect() {
  const boardWrap = document.getElementById('board-wrap');
  boardWrap.classList.add('gameover-flash');
  setTimeout(() => boardWrap.classList.remove('gameover-flash'), 700);
  document.body.classList.add('screen-shake');
  setTimeout(() => document.body.classList.remove('screen-shake'), 500);
  const rating =
    score >= 2000 ? {label: 'S', color: '#ffe600', msg: 'LEGENDARY!'}
    : score >= 1000 ? {label: 'A', color: '#39ff14', msg: 'EXCELLENT!'}
    : score >= 500  ? {label: 'B', color: '#00f0ff', msg: 'GREAT!'}
    : score >= 200  ? {label: 'C', color: '#bf00ff', msg: 'WOW AMAZING!'}
    :                 {label: 'D', color: '#ff2d95', msg: 'KEEP TRYING'};
  let gradeEl = document.getElementById('go-grade');
  if (!gradeEl) {
    gradeEl = document.createElement('div');
    gradeEl.id = 'go-grade';
    const h2 = document.querySelector('#gameover-overlay h2');
    if (h2) h2.insertAdjacentElement('afterend', gradeEl);
  }
  gradeEl.innerHTML =
    '<div class="grade-badge" style="color:' + rating.color
    + ';border-color:' + rating.color
    + ';box-shadow:0 0 20px ' + rating.color + '66">' + rating.label + '</div>'
    + '<div class="grade-msg" style="color:' + rating.color + '">' + rating.msg + '</div>';
}


function closeQuiz() {
  document.getElementById('quiz-overlay').classList.add('hidden');
  quizActive = false;
}

window.startGame = function() {
  initBoard();
  score = 0;
  lines = 0;
  level = 1;
  questionsAnswered = 0;
  gameOver = false;
  quizActive = false;
  gameStarted = true;
  current = randomPiece();
  next = randomPiece();
  renderNext();
  updateUI();
  updateDiffBadge();
  document.getElementById('start-overlay').classList.add('hidden');
  document.getElementById('gameover-overlay').classList.add('hidden');
  closeQuiz();
  resumeGame();
};

function pauseGame() {
  if (gameLoop) {
    clearInterval(gameLoop);
    gameLoop = null;
  }
}

function resumeGame() {
  if (gameOver || quizActive) return;
  gameLoop = setInterval(() => {
    if (!collides(current.shape, current.x, current.y + 1)) {
      current.y++;
    } else {
      lockPiece();
    }
    render();
  }, Math.max(100, 800 - (level - 1) * 60));
}

async function triggerGameOver(reason) {
  gameOver = true;
  pauseGame();
  await saveScoreToDatabase();
  document.getElementById('go-reason').textContent = reason || '';
  document.getElementById('go-score').textContent = score;
  document.getElementById('go-lines').textContent = lines;
  document.getElementById('gameover-overlay').classList.remove('hidden');
  showGameOverEffect();
}

document.addEventListener('keydown', e => {
  if (!gameStarted || gameOver || quizActive) return;
  if (e.key === 'ArrowLeft') {
    if (!collides(current.shape, current.x - 1, current.y)) current.x--;
  } else if (e.key === 'ArrowRight') {
    if (!collides(current.shape, current.x + 1, current.y)) current.x++;
  } else if (e.key === 'ArrowUp') {
    const rot = rotate(current.shape);
    if (!collides(rot, current.x, current.y)) current.shape = rot;
    else if (!collides(rot, current.x - 1, current.y)) {
      current.shape = rot;
      current.x--;
    } else if (!collides(rot, current.x + 1, current.y)) {
      current.shape = rot;
      current.x++;
    }
  } else if (e.key === 'ArrowDown') {
    if (!collides(current.shape, current.x, current.y + 1))
      current.y++;
    else
      lockPiece();
  } else if (e.key === ' ') {
    e.preventDefault();
    hardDrop();
    return;
  } else return;
  e.preventDefault();
  render();
});

function hardDrop() {
  let d = 0;
  while (!collides(current.shape, current.x, current.y + 1 + d)) d++;
  score += d * 2;
  current.y += d;
  lockPiece();
  render();
}

function render() {
  const boardEl = document.getElementById('game-board');
  const snap = board.map(r => [...r]);
  let ghostY = current.y;
  while (!collides(current.shape, current.x, ghostY + 1)) ghostY++;
  for (let r = 0; r < current.shape.length; r++)
    for (let c = 0; c < current.shape[r].length; c++)
      if (current.shape[r][c]) {
        const ny = ghostY + r, nx = current.x + c;
        if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS && !snap[ny][nx])
          snap[ny][nx] = 'ghost';
      }
  for (let r = 0; r < current.shape.length; r++)
    for (let c = 0; c < current.shape[r].length; c++)
      if (current.shape[r][c]) {
        const ny = current.y + r, nx = current.x + c;
        if (ny >= 0 && ny < ROWS) snap[ny][nx] = current.color;
      }
  boardEl.innerHTML = '';
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      const v = snap[r][c];
      if (v && v !== 'ghost') {
        cell.classList.add('filled');
        cell.style.background = v;
        cell.style.boxShadow = `0 0 6px ${v}66,inset 0 1px 0 rgba(255,255,255,.15)`;
      } else if (v === 'ghost') {
        cell.style.background = 'rgba(0,240,255,.08)';
        cell.style.border = '1px solid rgba(0,240,255,.2)';
      }
      boardEl.appendChild(cell);
    }
}

function renderNext() {
  const el = document.getElementById('next-board');
  el.innerHTML = '';
  const s = next.shape;
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) {
      const cell = document.createElement('div');
      cell.className = 'next-cell';
      if (r < s.length && c < s[0].length && s[r][c]) {
        cell.classList.add('filled');
        cell.style.background = next.color;
        cell.style.boxShadow = `0 0 5px ${next.color}55`;
      }
      el.appendChild(cell);
    }
}

function updateUI() {
  document.getElementById('score').textContent = score;
  document.getElementById('lines').textContent = lines;
  document.getElementById('level').textContent = level;
  updateDiffBadge();
}

//  SAVE SCORE TO DATABASE
async function saveScoreToDatabase() {
  if (!currentUser) return;
  
  const scoreData = {
    user_id: currentUser.id,
    name: currentUser.name,
    strand: currentUser.strand,
    score: score,
    lines: lines,
    level: level,
    difficulty: getDifficultyLabel()
  };
  
  try {
    const result = await DB.leaderboard.add(scoreData);
    console.log('Score saved:', result);
    
    if (currentUser.high_score < score) {
      currentUser.high_score = score;
    }
    currentUser.games_played = (currentUser.games_played || 0) + 1;
    currentUser.total_score = (currentUser.total_score || 0) + score;
  } catch (error) {
    console.error('Failed to save score:', error);
  }
}

//  NAVIGATION
window.goToHome = function() {
  document.getElementById('home-overlay').classList.add('active');
};

window.closeHomeConfirm = function() {
  document.getElementById('home-overlay').classList.remove('active');
};

window.confirmGoToHome = function() {
  pauseGame();
  window.location.href = 'index.html';
};

//  PAGE LOADING
window.addEventListener('DOMContentLoaded', async () => {
  const session = DB.session.get();
  if (!session) {
    window.location.href = 'Login.html';
    return;
  }
  
  const user = await DB.users.getCurrentUser();
  if (!user) {
    DB.session.clear();
    window.location.href = 'Login.html';
    return;
  }
  
  currentUser = user;
  
  document.getElementById('loading-overlay').classList.add('hidden');
  
  initBoard();
  current = randomPiece();
  next = randomPiece();
  document.getElementById('timer-ring-fg').style.strokeDasharray = CIRCUMFERENCE;
  document.getElementById('timer-ring-fg').style.strokeDashoffset = 0;
  
  document.getElementById('start-overlay').classList.remove('hidden');
  
  // Touch Controls
  initTouchControls();
});

// MOBILE TOUCH CONTROLS
function initTouchControls() {
  const boardWrap = document.getElementById('board-wrap');
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;
  let lastTapX = 0;
  let lastTapY = 0;
  let touchMoved = false;
  
  // Prevent default touch behaviors
  document.addEventListener('touchmove', function(e) {
    if (gameStarted && !gameOver && !quizActive) {
      e.preventDefault();
    }
  }, { passive: false });
  
  boardWrap.addEventListener('touchstart', function(e) {
    if (!gameStarted || gameOver || quizActive) return;
    
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    lastTapX = touch.clientX;
    lastTapY = touch.clientY;
    touchStartTime = Date.now();
    touchMoved = false;
  }, { passive: true });
  
  boardWrap.addEventListener('touchmove', function(e) {
    if (!gameStarted || gameOver || quizActive) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - lastTapX;
    const deltaY = touch.clientY - lastTapY;
    
    // Check for horizontal swipe movement
    if (Math.abs(touch.clientX - touchStartX) > 10 || Math.abs(touch.clientY - touchStartY) > 10) {
      touchMoved = true;
    }
    
    // Move piece left/right based on swipe
    if (Math.abs(deltaX) > 20) {
      if (deltaX > 0) {
        // Swipe right - move right
        if (!collides(current.shape, current.x + 1, current.y)) {
          current.x++;
          render();
        }
      } else {
        // Swipe left - move left
        if (!collides(current.shape, current.x - 1, current.y)) {
          current.x--;
          render();
        }
      }
      lastTapX = touch.clientX;
    }
    
    // Move piece down on fast swipe down
    if (deltaY > 30 && !collides(current.shape, current.x, current.y + 1)) {
      current.y++;
      render();
      lastTapY = touch.clientY;
    }
  }, { passive: true });
  
  boardWrap.addEventListener('touchend', function(e) {
    if (!gameStarted || gameOver || quizActive) return;
    
    const touchDuration = Date.now() - touchStartTime;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    
    // If it was a quick tap without much movement, rotate
    if (!touchMoved && touchDuration < 300 && Math.abs(deltaX) < 20 && Math.abs(deltaY) < 20) {
      rotatePiece();
    }
  }, { passive: true });
  
  // Add swipe detection on entire game area
  const gameArea = document.querySelector('.game-wrapper');
  if (gameArea) {
    let swipeStartX = 0;
    let swipeStartY = 0;
    
    gameArea.addEventListener('touchstart', function(e) {
      swipeStartX = e.touches[0].clientX;
      swipeStartY = e.touches[0].clientY;
    }, { passive: true });
    
    gameArea.addEventListener('touchend', function(e) {
      if (!gameStarted || gameOver || quizActive) return;
      
      const swipeEndX = e.changedTouches[0].clientX;
      const swipeEndY = e.changedTouches[0].clientY;
      const deltaX = swipeEndX - swipeStartX;
      const deltaY = swipeEndY - swipeStartY;
      
      // Detect swipe gestures
      if (Math.abs(deltaX) > 30 || Math.abs(deltaY) > 30) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          if (deltaX > 0) {
            moveRight();
          } else {
            moveLeft();
          }
        } else {
          // Vertical swipe
          if (deltaY > 0) {
            softDrop();
          } else {
            rotatePiece();
          }
        }
      }
    }, { passive: true });
  }
  
  // Setup on-screen button controls
  setupMobileButtons();
}

function setupMobileButtons() {
  // Create mobile control buttons container
  const controlsContainer = document.createElement('div');
  controlsContainer.id = 'mobile-controls';
  controlsContainer.innerHTML = `
    <div class="mobile-btn-row">
      <button class="mobile-btn mobile-rotate" id="btn-rotate">
        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/></svg>
      </button>
    </div>
    <div class="mobile-btn-row">
      <button class="mobile-btn mobile-left" id="btn-left">
        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <button class="mobile-btn mobile-down" id="btn-down">
        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
      </button>
      <button class="mobile-btn mobile-right" id="btn-right">
        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
      </button>
    </div>
    <div class="mobile-btn-row">
      <button class="mobile-btn mobile-drop" id="btn-drop">
        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></svg>
      </button>
    </div>
  `;
  
  document.getElementById('game-screen').appendChild(controlsContainer);
  
  // Add button event listeners
  document.getElementById('btn-left').addEventListener('touchstart', function(e) {
    e.preventDefault();
    moveLeft();
    this.classList.add('active');
  });
  document.getElementById('btn-left').addEventListener('touchend', function() {
    this.classList.remove('active');
  });
  
  document.getElementById('btn-right').addEventListener('touchstart', function(e) {
    e.preventDefault();
    moveRight();
    this.classList.add('active');
  });
  document.getElementById('btn-right').addEventListener('touchend', function() {
    this.classList.remove('active');
  });
  
  document.getElementById('btn-down').addEventListener('touchstart', function(e) {
    e.preventDefault();
    softDrop();
    this.classList.add('active');
  });
  document.getElementById('btn-down').addEventListener('touchend', function() {
    this.classList.remove('active');
  });
  
  document.getElementById('btn-rotate').addEventListener('touchstart', function(e) {
    e.preventDefault();
    rotatePiece();
    this.classList.add('active');
  });
  document.getElementById('btn-rotate').addEventListener('touchend', function() {
    this.classList.remove('active');
  });
  
  document.getElementById('btn-drop').addEventListener('touchstart', function(e) {
    e.preventDefault();
    hardDrop();
    this.classList.add('active');
  });
  document.getElementById('btn-drop').addEventListener('touchend', function() {
    this.classList.remove('active');
  });
  
  // Mouse events for testing on desktop
  document.getElementById('btn-left').addEventListener('mousedown', function() {
    moveLeft();
  });
  document.getElementById('btn-right').addEventListener('mousedown', function() {
    moveRight();
  });
  document.getElementById('btn-down').addEventListener('mousedown', function() {
    softDrop();
  });
  document.getElementById('btn-rotate').addEventListener('mousedown', function() {
    rotatePiece();
  });
  document.getElementById('btn-drop').addEventListener('mousedown', function() {
    hardDrop();
  });
}

function moveLeft() {
  if (!gameStarted || gameOver || quizActive) return;
  if (!collides(current.shape, current.x - 1, current.y)) {
    current.x--;
    render();
  }
}

function moveRight() {
  if (!gameStarted || gameOver || quizActive) return;
  if (!collides(current.shape, current.x + 1, current.y)) {
    current.x++;
    render();
  }
}

function softDrop() {
  if (!gameStarted || gameOver || quizActive) return;
  if (!collides(current.shape, current.x, current.y + 1)) {
    current.y++;
    render();
  }
}

function rotatePiece() {
  if (!gameStarted || gameOver || quizActive) return;
  const rot = rotate(current.shape);
  if (!collides(rot, current.x, current.y)) {
    current.shape = rot;
  } else if (!collides(rot, current.x - 1, current.y)) {
    current.shape = rot;
    current.x--;
  } else if (!collides(rot, current.x + 1, current.y)) {
    current.shape = rot;
    current.x++;
  }
  render();
}