
let comicnumber;
let numtimes = new Array(4000);
for (let i = 1; i < 4000; i++) {
    numtimes[i] = 0;
}
jQuery(document).ready(function() {

    // On page-load AJAX Example
    jQuery.ajax({
        type: 'get',            //Request type
        dataType: 'json',       //Data type - we will use JSON for almost everything 
        url: '/getimgsrc',   //The server endpoint we are connecting to
        data: {
            data1: 1,
        },
        success: function (data) {
            document.getElementById('b').href = "#" + 1
            comicnumber = 1
            let body = document.getElementsByTagName("body")[0];
            let img = document.createElement("img");
            img.src = data.dat.img;
            img.id = 'TheImageID'
            let comicnum = document.createElement("a")
            comicnum.id = 'num'
            let comictext = document.createTextNode("Comic Number: " + comicnumber + " ");
            let comicdate = document.createElement("a")
            comicdate.id = 'date'
            let datetext = document.createTextNode("Comic Created: " + data.dat.year + " ");
            numtimes[comicnumber]++;
            let numtime = document.createElement("a")
            numtime.id = "time"
            let numtimetext = document.createTextNode("Comic viewed: " + numtimes[comicnumber] + " times")
            numtime.appendChild(numtimetext)
            comicdate.appendChild(datetext)
            comicnum.appendChild(comictext)
            body.appendChild(comicdate)
            body.appendChild(document.createElement("br"))
            body.appendChild(comicnum)
            body.appendChild(document.createElement("br"))
            body.appendChild(numtime)
            body.appendChild(document.createElement("br"))
            body.appendChild(img);
        }
    })
    $('#chooser').submit(function(e) {
        e.preventDefault();
        jQuery.ajax({
            type: 'get',            //Request type
            dataType: 'json',       //Data type - we will use JSON for almost everything 
            url: '/getimgsrc',   //The server endpoint we are connecting to
            data: {
                data1: $('#N').val(),
            },
            success: function (data) {
                console.log(data.dat)
                if (data.dat != 'error') {
                    comicnumber = parseInt($('#N').val())
                    numtimes[comicnumber]++;
                    document.getElementById('TheImageID').src = data.dat.img;
                    document.getElementById('num').innerHTML = "Comic Number: " + comicnumber + " "
                    document.getElementById('date').innerHTML = "Comic Created: " + data.dat.year + " "
                    document.getElementById('time').innerHTML = "Comic viewed: " + numtimes[comicnumber] + " times"
                    $('#blah').html("Comic Exists");
                } else {
                    console.log("error")
                    $('#blah').html("Comic Does Not exist yet");
                }
            }
        })
    });
    $(document).on('click', '.next', function() {
        comicnumber = comicnumber + 1
        jQuery.ajax({
            type: 'get',            //Request type
            dataType: 'json',       //Data type - we will use JSON for almost everything 
            url: '/getimgsrc',   //The server endpoint we are connecting to
            data: {
                data1: comicnumber,
            },
            success: function (data) {
                if (data.dat != 'error') {
                    document.getElementById('TheImageID').src = data.dat.img;
                    document.getElementById('num').innerHTML = "Comic Number: " + comicnumber + " "
                    document.getElementById('date').innerHTML = "Comic Created: " + data.dat.year + " "
                    numtimes[comicnumber]++;
                    document.getElementById('time').innerHTML = "Comic viewed: " + numtimes[comicnumber] + " times"
                    $('#blah').html("Comic Exists");
                } else {
                    console.log("error")
                    $('#blah').html("Comic Does Not exist yet");
                    comicnumber = comicnumber - 1
                }
            }, 
            fail: function(error) {
                // Non-200 return, do something with error
                
                console.log(error); 
            }
        })
    });
    $(document).on('click', '.previous', function() {
        comicnumber = comicnumber - 1
        jQuery.ajax({
            type: 'get',            //Request type
            dataType: 'json',       //Data type - we will use JSON for almost everything 
            url: '/getimgsrc',   //The server endpoint we are connecting to
            data: {
                data1: comicnumber,
            },
            success: function (data) {  
                if (data.dat != 'error') {
                    document.getElementById('TheImageID').src = data.dat.img;
                    document.getElementById('num').innerHTML = "Comic Number: " + comicnumber + " "
                    document.getElementById('date').innerHTML = "Comic Created: " + data.dat.year + " "
                    numtimes[comicnumber]++;
                    document.getElementById('time').innerHTML = "Comic viewed: " + numtimes[comicnumber] + " times" 
                    $('#blah').html("Comic Exists");
                } else {
                    console.log("error")
                    $('#blah').html("Comic Does Not exist yet");
                    comicnumber = comicnumber + 1
                }
            }, 
            fail: function(error) {
                // Non-200 return, do something with error
                console.log(error); 
            }
        })
    });
    $(document).on('click', '.random', function() {
        jQuery.ajax({
            type: 'get',            //Request type
            dataType: 'json',       //Data type - we will use JSON for almost everything 
            url: '/getrandomimgsrc',   //The server endpoint we are connecting to
            data: {
                data1: "sdsd",
            },
            success: function (data) {  
                if (data.dat != 'error') {
                    document.getElementById('TheImageID').src = data.dat.img;
                    document.getElementById('num').innerHTML = "Comic Number: " + data.dat.num + " "
                    document.getElementById('date').innerHTML = "Comic Created: " + data.dat.year + " "
                    comicnumber = data.dat.num
                    numtimes[comicnumber]++;
                    document.getElementById('time').innerHTML = "Comic viewed: " + numtimes[comicnumber] + " times"
                } else {
                    console.log("error")
                    $('#blah').html("Comic Does Not exist yet");
                }
            }, 
            fail: function(error) {
                // Non-200 return, do something with error
                console.log(error); 
            }
        })
    });
    $(document).on('click', '.latest', function() {
        jQuery.ajax({
            type: 'get',            //Request type
            dataType: 'json',       //Data type - we will use JSON for almost everything 
            url: '/getlatestimgsrc',   //The server endpoint we are connecting to
            data: {
                data1: "sdsd",
            },
            success: function (data) {  
                if (data.dat != 'error') {
                    document.getElementById('TheImageID').src = data.dat.img;
                    document.getElementById('num').innerHTML = "Comic Number: " + data.dat.num + " "
                    document.getElementById('date').innerHTML = "Comic Created: " + data.dat.year + " "
                    comicnumber = data.dat.num
                    numtimes[comicnumber]++;
                    document.getElementById('time').innerHTML = "Comic viewed: " + numtimes[comicnumber] + " times"
                } else {
                    console.log("error")
                    $('#blah').html("Comic Does Not exist yet");
                }
            }, 
            fail: function(error) {
                // Non-200 return, do something with error
                console.log(error); 
            }
        })
    });
});




