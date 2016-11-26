'use strict'

const NarLoader = require('narloader').NarLoader

Promise.all([
  NarLoader.loadFromURI("./nar/mobilemaster.nar"),
  NarLoader.loadFromURI("./nar/origin.nar")
]).then(function(arg){
  var shellNanikaDir = arg[0].readFileSync();
  var balloonNanikaDir = arg[1].readFileSync();
  console.log(arg)
  var shellDir = shellNanikaDir.getDirectory("shell/master").asArrayBuffer();
  var balloonDir = balloonNanikaDir.asArrayBuffer();
  var shell = new cuttlebone.Shell(shellDir);
  var balloon = new cuttlebone.Balloon(balloonDir);
  return Promise.all([
    shell.load(),
    balloon.load()
  ]);
}).then(function(arg){
  var shell = arg[0];
  var balloon = arg[1];

  var nmdmgr = new cuttlebone.NamedManager()
  document.body.appendChild(nmdmgr.element);

  var hwnd = nmdmgr.materialize(shell, balloon);
  var named = nmdmgr.named(hwnd);

  named.scope(0).surface(0);
  named.scope(0).blimp(0).talk("Hello world!");
});
