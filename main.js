const treeify = require('treeify');

const {
  fetchPackageFiles,
  fetchProjectFiles
} = require('./services/scanner');

const {
  findDependencies
} = require('./services/matcher');

//Draw map.
const drawMap = (list)=>{

  let tree = {};

  //Fill props.
  list.forEach(l=>{

    //Fill items.
    let a = {};

    if (l.dependencies.length>0)
      l.dependencies.forEach(e=>a[e]=null);
    else
      a['Not found']=null;

    //Add parent element.
    tree[l.package]= a;

  });

  console.log(treeify.asTree(tree, true)); 

}

//Download and parse the projects to scan.
const createMaps = async ()=>{

  console.log('> Scanning packages repositories...');
  
  //Create a map with the packages and his versions and names.
  const packagesMap = await fetchPackageFiles('21557425');

  console.log('> Downloading projects and parsing...');

  //Create a map with the project dependencies list.
  const projectsMap = await fetchProjectFiles();
  
  console.log(`> Found #${packagesMap.length} packages, #${projectsMap.length} projects...`);
  
  //Create the dependencies list.
  const list = findDependencies(packagesMap,projectsMap);
  
  console.log('');
  console.log('< Dependencies map >');
  console.log('');

  //Draw map list.
  drawMap(list);

}

createMaps();