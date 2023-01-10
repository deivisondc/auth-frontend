import { useContext, useEffect } from "react"
import { withSSRAuth } from "../../utils/withSSRAuth"
import { AuthContext } from "../contexts/AuthContext"
import { setupApiClient } from "../services/api"
import { api } from "../services/apiClient"
import decode from 'jwt-decode'

export default function Metrics() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me').catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>Metrics</h1>
    </div>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx)
  const response = await apiClient.get('/me')
  
  return {
    props: {}
  }
}, {
  permissions: ['metrics.list2'],
  roles: ['administrator']
})