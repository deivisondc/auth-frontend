import { useContext, useEffect } from "react"
import { Can } from "../../components/Can"
import { useCan } from "../../hooks/useCan"
import { withSSRAuth } from "../../utils/withSSRAuth"
import { AuthContext } from "../contexts/AuthContext"
import { setupApiClient } from "../services/api"
import { api } from "../services/apiClient"

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me').catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h1>Dashboard: {user?.email}</h1>

      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </div>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx)
  const response = await apiClient.get('/me')

  console.log(response.data)
  
  return {
    props: {}
  }
})