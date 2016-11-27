'use strict'

const NarLoader = require('narloader').NarLoader

Promise.all([
  NarLoader.loadFromURL("./nar/mobilemaster.nar"),
  NarLoader.loadFromURL("./nar/origin.nar")
]).then(function(arg){
  const shellNanikaDir = arg[0]
  const balloonNanikaDir = arg[1]
  console.log(arg)
  const shellDir = shellNanikaDir.getDirectory("shell/master").asArrayBuffer();
  const balloonDir = balloonNanikaDir.asArrayBuffer();
  const shell = new cuttlebone.Shell(shellDir);
  const balloon = new cuttlebone.Balloon(balloonDir);
  return Promise.all([
    shell.load(),
    balloon.load()
  ]);
}).then(function(arg){
  const shell = arg[0];
  const balloon = arg[1];

  const nmdmgr = new cuttlebone.NamedManager()
  document.body.appendChild(nmdmgr.element);

  const hwnd = nmdmgr.materialize(shell, balloon);
  const named = nmdmgr.named(hwnd);

  named.scope(0).surface(0);
  named.scope(0).blimp(0);
});
