import { useContext } from 'react'
import { context as clientContext } from '../../../contexts/client-context'
import MapProvider from '../../../components/ol-react'
import baseLayer from '../../../components/ol-react/layers/terrestris-base-map'
import Fade from '@mui/material/Fade'
import { parse } from 'wkt'
import { Div } from '../../../components/html-tags'
import { alpha } from '@mui/material/styles'
import HeatMap from './_heat-map'
import { useImageHeight } from '../../../components/header/application-banner'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

export default ({ children }) => {
  const {
    region: { centroid },
    isDefault: isDefaultTenant,
  } = useContext(clientContext)
  const imageHeight = useImageHeight()

  const [x, y] = parse(centroid).coordinates
  const zoom = isDefaultTenant ? 6.5 : 7.5

  return (
    <Div
      sx={theme => ({
        width: '100%',
        position: 'relative',
        height: `calc(100vh - ${
          imageHeight + parseInt(theme.spacing(3).replace('px', ''), 10) + 64 + 48
        }px)`,
        [theme.breakpoints.down('sm')]: {
          height: `calc(100vh - ${
            imageHeight + parseInt(theme.spacing(3).replace('px', ''), 10) + 56 + 48
          }px)`,
        },
      })}
    >
      <Fade timeout={2000} key="map" in={true}>
        <Div
          sx={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: 7,
            opacity: 1,
            backgroundColor: theme => alpha(theme.palette.common.black, 0.3),
            backgroundImage: theme =>
              `linear-gradient(${alpha(
                theme.palette.primary.main,
                0.05
              )} 0.7000000000000001px, transparent 0.7000000000000001px)`,
            backgroundSize: '10px 10px',
          }}
        />
      </Fade>

      <MapProvider
        view={{
          zoom,
          center: [x, y],
        }}
        interactions={[]}
        controls={[]}
        layers={[baseLayer()]}
      >
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: theme => alpha(theme.palette.common.white, 0.8),
            m: theme => theme.spacing(0),
            p: theme => theme.spacing(0.5),
          }}
        >
          ©{' '}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.openstreetmap.org/copyright"
          >
            OpenStreetMap
          </Link>{' '}
          contributors
        </Typography>
        <HeatMap zoom={zoom} />
        {children}
      </MapProvider>
    </Div>
  )
}
