/*
 master: minor
 release : preminor
 develop : prerelease
*/


const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

const rootPath = path.resolve(__dirname, '..');
const verPattern = /(\d+)\.(\d+)\.(\d+)($|\-)/;

const getVersion = async () => {
  const match = packageJson.version.match(verPattern);

  if (match === null) {
    throw new Error('package.json version is malformded');
  }

  const [ locVersion, major, minor, patch ] = match;
  return { locVersion };
}

const getNpmVersion = async () => {
  // const cmd = 'npm show ruler --registry https://npm.29cm.co.kr version';

  const cmd = `npm show ${packageJson.name} version`;


  const version = execSync(cmd, { maxBuffer: 1024 * 5000 }).toString();

  if (!version) {
    throw new Error('npm version didn`t take in repo');
  }

  return version.trim();
}


const publish = async () => {
  try {
    const { locVersion } = await getVersion();
    const npmVersion = await getNpmVersion();

    return {
      locVersion, npmVersion
    }
  } catch (e) {
    console.log('error');
  }
}


publish().then(res => {
  console.log(res);
})
