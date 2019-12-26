var myEvents = [];
const { createWorker } = FFmpeg;
const worker = createWorker();
const message = document.getElementById('message');
message.innerHTML = 'Loading ffmpeg-core.js';
worker.load()
message.innerHTML = 'Load complete';
const transcode = async ({ target: { files } }) => {

console.log(files[0]);
const { name } = files[0];
console.log(name)
start_time = document.getElementById("start").value
end_time = document.getElementById("end").value
console.log(start_time)
console.log(end_time)
console.log(end_time-start_time)
await worker.write(name, files[0]);
message.innerHTML = 'Start cut';
await worker.cut(name,  'output.mp4',start_time,(end_time-start_time));
message.innerHTML = 'Complete transcoding';
const { data } = await worker.read('output.mp4');
console.log(data);
const video = document.getElementById('output-video');
video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
}

function logEvent(e)
{
	
	var {target : {files}} = e
	console.log(files)
    e.preventDefault(); // prevent default behaviour if needed
    myEvents.push(e); // Store event info
}
const elm = document.getElementById('uploader');
elm.addEventListener('change', logEvent);

const cut_btn = document.getElementById('cut-btn');
cut_btn.addEventListener('click', function(){
    transcode(myEvents.slice(-1)[0])
});
