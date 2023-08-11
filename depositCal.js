const readlineSync = require('readline-sync');

function checkFormat(date){
	if (date.substr(2,1) !== "/" || date.substr(5,1) !== "/" || date.length !== 10){
		console.log( date, "input error!")
		return main()
	}
}

const allData = require ('./utilityCost.json')

function calCost(startDate, endDate, houseNum){
	let startYear = startDate.substr(6,4)
	let startMonth = startDate.substr(0,2)
	let startDay = startDate.substr(3,2)	
	let endYear = endDate.substr(6,4)
	let endMonth = endDate.substr(0,2)
	let jEnd = endMonth -1
	let endDay = endDate.substr(3,2)
	houseNum = houseNum.toString()
	let sumCost = 0
	let personalTempCost = 0
	if (endYear > startYear){
		for (i = startMonth; i < 12; i++){ ////whole month
			if (allData[houseNum][startYear][i + 2] > allData[houseNum]["Covered"]){
				let tempCost = allData[houseNum][startYear][i + 2] - allData[houseNum]["Covered"]
     			sumCost = sumCost + tempCost
			}

		}
		for (j = 0; j < jEnd; j++ ){ //whole month
			if ( allData[houseNum][endYear][j] > allData[houseNum]["Covered"]){
				let tempCost = allData[houseNum][endYear][j] - allData[houseNum]["Covered"]
				sumCost = sumCost + tempCost
			}
		}
		personalTempCost = sumCost / allData[houseNum]["DivNum"]
	} else if (endYear = startYear){
		for (i = startMonth; i < jEnd; i++){
			if (allData[houseNum][startYear][i + 2] > allData[houseNum]["Covered"]){
				let tempCost = allData[houseNum][startYear][i + 2] - allData[houseNum]["Covered"]
     			sumCost = sumCost + tempCost
			}
		}
		personalTempCost = sumCost / allData[houseNum]["DivNum"]
	}


	let firstDayCost = (allData[houseNum][startYear][parseInt(startMonth) + 1] - allData[houseNum]["Covered"]) * (30 - startDay) / 30 / allData[houseNum]["DivNum"]
	console.log("firstMonthCost", firstDayCost)
		if (firstDayCost <= 0){
			firstDayCost = 0
		}
	let lastDayCost =  (allData[houseNum][endYear][parseInt(endMonth) - 1] - allData[houseNum]["Covered"]) * endDay / 30 / allData[houseNum]["DivNum"]
		if (lastDayCost <= 0){
			lastDayCost = 0
		}
	console.log("lastMonthCost", lastDayCost)
	let totalPersonalCost = personalTempCost + firstDayCost + lastDayCost
	console.log("total personal utility cost", totalPersonalCost)
}

async function main(){
 	try{ 
		var startDate = readlineSync.question('please enter start date, following date format: xx/xx/xxxx (no space), ex: 06/11/2022:\t')
		checkFormat(startDate)
		var endDate = readlineSync.question('please enter end date, following date format: xx/xx/xxxx (no space); ex: 06/11/2022:\t')
		checkFormat(endDate)
		var houseNum = readlineSync.question('please enter your house number, enter a number from 1 to 4:\t')
		if (!(houseNum == 1 || houseNum == 2 || houseNum == 3 || houseNum == 4)){
			console.log("house number error!")
			return main()
		}
		calCost(startDate, endDate, houseNum)
		return
	} catch (e){

	}
}



main()

