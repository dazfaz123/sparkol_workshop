
const { promisify } = require('util')
const awscred = require('awscred')

let initialized = false

const init = async () => {
  if (initialized) {
    return
  }

  process.env.TEST_ROOT = "https://rmmbh0kdzb.execute-api.us-east-2.amazonaws.com/dev"
  process.env.restaurants_api      = "https://rmmbh0kdzb.execute-api.us-east-2.amazonaws.com/dev/restaurants"
  process.env.restaurants_table    = "restaurants-darren"
  process.env.AWS_REGION           = "us-east-2"

  //process.env.cognito_user_pool_id = "test_cognito_user_pool_id"
  //process.env.cognito_client_id    = "test_cognito_client_id"
  process.env.cognito_user_pool_id = "us-east-2_CBLMo4oSE"
  process.env.cognito_client_id    = "3kt03pov79gef4h8ivuthrg4md"
  process.env.cognito_server_client_id = "5nkgf5elrtmbvht2i9vuo68v00" 
  
  const { credentials } = await promisify(awscred.load)()
  
  process.env.AWS_ACCESS_KEY_ID     = credentials.accessKeyId
  process.env.AWS_SECRET_ACCESS_KEY = credentials.secretAccessKey
  if (credentials.sessionToken) {
    process.env.AWS_SECURITY_TOKEN    = credentials.sessionToken
  }

  console.log('AWS credential loaded')

  initialized = true
}

module.exports = {
  init
}