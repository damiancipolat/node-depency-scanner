//Find the projects with common modules.
const findCommon = (pkgName, collections)=>{
  
  //Filter commns.
  return collections
    .filter(c=>c.dependencies.hasOwnProperty(pkgName))
    .map(c=>c.name);

}

//Make a list of dependencies.
const findDependencies = (pkgMaps, projectMaps)=>{

  return pkgMaps.map(p=>({
    package:p.pkgName,
    dependencies:findCommon(p.pkgName,projectMaps)
  }));
}

module.exports = {
  findDependencies,
  findCommon
};