const config = require('config');

const {
  source,
  name
} = config.get('origin');

//Configuration names.
const destinations = config.get('destination');
const packages = config.get('packages');
const branch = config.get('compareBranch');

//Include api methods.
const {
  getTree,
	getFile,
	getProjectsGroup  
} = require('../lib/api');

//Decode
const {
  decode64
}=require('../lib/decoder');

const ROOT_FILE = 'package.json';

//Process download set.
const fetchPackageFiles = async (projectId)=>{

  //Fetch only the folders.
  const rootFolders = await getTree(projectId);

  //Parse the files.
  const parsed = rootFolders
    .filter(e=>!e.path.includes('.'))
    .map(({id,name,path})=>({id,name,path}));

  //Download a list of encoded files.
  const downloaded = await Promise.all(parsed.map(p=>getFile(projectId,`${p.path}%2F${ROOT_FILE}`,'master')));
  
  //Package map.
  const packages = downloaded.map(e=>JSON.parse(decode64(e.content)));

  //Assemble the map.
  return parsed.map((p,i)=>({
    name:p.name,
    pkgVersion:packages[i].version,
    pkgName:packages[i].name
  }));

}

//Download and parse the projects to scan.
const fetchProjectFiles = async (projectId)=>{

  //Get the list of projects in the group.
  const projects = await getProjectsGroup(name);

  //Filter and parse project.
  const selected = projects
    .filter(p=>destinations.includes(p.name))
    .map(({id,name})=>({id,name}));

  //Download files from develop branch.
  const downloaded = await Promise.all(selected.map(p=>getFile(p.id,`${ROOT_FILE}`,branch)));
  
  //Package map.
  const packages = downloaded.map(e=>JSON.parse(decode64(e.content)));
  
  //Assemble the map.
  return selected.map((p,i)=>({
    name:p.name,
    dependencies:packages[i].dependencies
  }));

}

module.exports = {
  fetchPackageFiles,
  fetchProjectFiles
};