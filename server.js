
/*
 * server.js
 * 
 * This file is used so that we can constantly start and stop the
 * hexo server because it seems like we're not actually able to see instant 
 * changes to our code when we change things. It appears that Hexo holds onto
 * our changes and we need to restart the server to be able to get the new code
 * changes.
 * 
 * Using exec, we aim to alleviate that issue.
 */

var exec = require('child_process').exec;
var options = {
    env : process.env,
    timeout: 3000
}

var hexoServerProcess;

function cycle () {
  hexoServerProcess = exec("hexo server", options);

   hexoServerProcess.stdout.on('data', (data) => {
    console.log(`[CHILD STDOUT]: ${data}`);
  });

   hexoServerProcess.stdout.on('close', (data) => {
    console.log(`[CHILD CLOSE EVENT]: ${data}`)
    
    console.log("[PARENT]: closed.")

    setTimeout(() => {
      cycle();
    }, 2000)
  })

  hexoServerProcess.stderr.on('data', (data) => {
    console.log(`[CHILD STDERR]: ${data}`);
  });
}

cycle();

// /*
//  * Start the hexo server the first time.
//  */

// console.log("[PARENT]: Starting Hexo Server");
// startHexoServer();

// /*
//  * Restart the server after 5 seconds
//  */

// function startHexoServer () {

//   hexoServerProcess = exec("hexo server", options);

//   /*
//    * Server started, set the events.
//    */

//   console.log("[PARENT]: Restarted child server.");
//   setEvents();
// }

// function logServerOutput (data) {
//   console.log(`[CHILD STDOUT]: ${data}`);

//   /*
//    * After the server has started, begin the 5 second kill timer.
//    */

//   if (data.toString().indexOf("Hexo is running") !== -1) {

//     console.log("[PARENT]: Killing in 5 seconds.")

//    /*
//     * Kill the server after 5 seconds
//     */

//     setTimeout(() => {
//       console.log("[PARENT]: Killed child server.")
//       hexoServerProcess.kill('SIGKILL');

//       // startHexoServer();
//     }, 5000);

//   }

// }

// function setEvents () {
//   hexoServerProcess.stdout.on('data', logServerOutput);

//   hexoServerProcess.stdout.on('close', (data) => {
//     console.log(`[CHILD CLOSE EVENT]: ${data}`)
    
//     console.log("[PARENT]: Restarting child server.")
//     hexoServerProcess = startHexoServer();
//   })

//   hexoServerProcess.stderr.on('data', (data) => {
//     console.log(`[CHILD STDERR]: ${data}`);
//   });
// }

/*
 * Kill the child process when we're done.
 */

process.on('exit', function () {
    hexoServerProcess.kill();
});