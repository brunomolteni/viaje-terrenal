const getDate = date => {
  let D = new Date(date);
  return `${D.getDate()}/${D.getMonth()+1}/${D.getFullYear()}`;
}

const getImage = (el, data) => {
  return data.includes.Asset.filter(asset => asset.sys.id === el.fields.heroImage.sys.id)[0].fields;
}

const getPrevAndNext = (i, data) => {
  let result = {};
  result.next = (i!== 0) ? Object.assign({},data[i-1]) : false;
  result.prev = (i!== data.length-1) ? Object.assign({},data[i+1]) : false;
  return result;
}

const getPostsWithImagesAndDate = data => {
  return data.items.map((el,i) => Object.assign( {} , el.fields ,  {heroImage: getImage(el, data), publishDate: getDate(el.fields.publishDate)  }) ).map( (el,i,array) => Object.assign( el, {adjacent: getPrevAndNext(i, array)} ) );
}

function getValidConfig (configEnv, keys) {
  let {config, missingKeys} = keys.reduce((acc, key) => {
    if (!configEnv[key]) {
      acc.missingKeys.push(key)
    } else {
      acc.config[key] = configEnv[key]
    }

    return acc
  }, {config: {}, missingKeys: []})

  if (missingKeys.length) {
    throw new Error(
      'Please provide needed Contentful configs:\n' +
      `\nMissing values: ${missingKeys.join(', ')}\n\n` +
      'There are two way to do so:\n' +
      '- define a .contentful.json file (similar to .contentful.sample.json) in the root of this directory\n' +
      `- define all environment variables ${keys.join(', ')}`
    )
  }

  return config
}


module.exports = {
  getConfigForKeys (keys) {
    let configEnv

    try {
      configEnv = require('./.contentful.json')
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        configEnv = process.env

        return getValidConfig(configEnv, keys)
      } else {
        throw error
      }
    }

    return getValidConfig(configEnv, keys)
  },
  getPostsWithImagesAndDate
}
