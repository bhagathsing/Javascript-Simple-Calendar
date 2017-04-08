

    function calendarmMonthView(cMonth, cYear) {
        var cal = document.getElementById("cal");
        var dateObj = {
          month:["January","February","March","April","May","June","July","August","September","October","November","December"],
          monthDays:[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
          weekDay:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
        };

        if((cYear %4 == 0) && (cYear % 100 != 0) || cYear % 400 == 0){
            dateObj.monthDays[1] = 29;
        }



        var tbls = "<table cellpadding=\"0\" cellspacing=\"0\"><thead><tr class=\"week-header\">";
        var days = 0;
        var rows = 0;
        var cMonths = cMonth+1;
        var dateStamp = cMonths+"/"+01+"/"+cYear;

        var dates = new Date(dateStamp);
        var cDateStamp = new Date();

        var day = dates.getDay();
        var month = dates.getMonth();

        var prevMonth = cMonth-1;
        if(prevMonth < 0){
            prevMonth = 11;
        }
        
        var datesObject = [];
        var preMonthDays = dateObj.monthDays[prevMonth];

        document.getElementById("my").innerHTML = dateObj.month[cMonth]+" "+cYear;

        var w=0;
        var weeks = dateObj.weekDay;
        var weekLen = weeks.length;

        for(w=0;w<weekLen; w++){
            tbls += "<td>"+weeks[w]+"</td>";
        }
        tbls += "</tr></thead><tr>";
        var cDates = 0;
        var prevDates = 0;
        var prevDays = 0;
        var startNextMonth = false;
        var startPrevMonth = false;
        var startCuurMonth = false;
        var rowCount = 42;
        var colCount = 7;
        var dateStamp = null;
        for (var i = 0; i < rowCount; i++) {
            if (i % colCount == 0 && i != 0) {
                days = 0;
                rows += 1;
                tbls += "</tr><tr>";
            }
            if(day > 0){
                prevDays = day;
                if(day <= days && rows==0){
                    cDates += 1;
                }else if(rows>0){
                    cDates += 1;
                }
            }else{
                prevDays = 7;
                if(rows > 0 ){
                    if(day <= days && rows>0){
                        cDates += 1;
                    }else if(rows>0){
                        cDates += 1;
                    }
                }
            }
            
            if( cDates > dateObj.monthDays[month] ){
                cDates = 1;
                startNextMonth = true;
                 startCuurMonth = false;
            }else if(cDates == 0){
                prevDates += 1;
                startPrevMonth = true;
                startCuurMonth = false;
            }else{
                prevDates = 0;
                startPrevMonth = false;
                startCuurMonth = false;
            }

            if(startNextMonth){
                var tdClass = "cMonth nMonth";
            }else if(startPrevMonth){
                var tdClass = "cMonth preMonth";
            }else{
                var tdClass = "cMonth";
                startCuurMonth = true; 
            }
            var sun = "";
            if(days == 0){
                sun = " week-end1";
            }else if(days == 6){
                sun = " week-end2";
            }
            
          
            var dateCount = cDates > prevDates ? (cDates - prevDates) : ((preMonthDays-(prevDays - prevDates)) - cDates);
            
            if(startPrevMonth){
              dateStamp = new Date((prevMonth+1)+"/"+dateCount+"/"+cYear);
            }else if(startNextMonth){
               dateStamp = new Date((cMonths+1)+"/"+dateCount+"/"+cYear);
            }else{
              dateStamp = new Date(cMonths+"/"+dateCount+"/"+cYear);
            }
            
            datesObject[i] = dateStamp;
           // console.log(dateStamp);
            var currentDate = "";
            if(cDateStamp.getFullYear() === dates.getFullYear() ){
                if(cDateStamp.getMonth() === dates.getMonth() &&  dateStamp.getMonth() === dates.getMonth()){
                    if(cDateStamp.getDate() === dateCount){
                        currentDate = " currentDate";
                    }
                }
            }
            
           // console.log( startCuurMonth)
            tbls += "<td class=\""+tdClass+currentDate+sun+"\">" + dateCount + "</td>";
            days++;
        }
        
        tbls += "</tr></tbody></table>";
        cal.innerHTML = tbls;
        
       // console.log(datesObject);
       
       var columns = document.querySelectorAll(".cMonth");
       var e=0;
       var lens = columns.length;
       for(e; e<lens; e++){
        columns[e].onclick = clickCallBack(e);
       }
       
       
       function clickCallBack( id ){
         return function(){
           console.log(datesObject[id]);
         }
       }
       
    }

   
