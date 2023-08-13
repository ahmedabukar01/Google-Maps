/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import { useJsApiLoader,GoogleMap, Marker, Autocomplete } from '@react-google-maps/api'
import { useRef, useState } from 'react'
import { LoadScript } from '@react-google-maps/api'

const center = {lat: 2.030882936228783,lng: 45.302110411366066}
// 2.030882936228783, 45.302110411366066

function App() {
  const [map, setMap] = useState(/** @type google.maps.Map */ null)
  const [directionRes, setDirectionRes] = useState(null)
  const [duration, setDuration] = useState('')
  const [distance, setDistance] = useState('')

  const originRef = useRef();
  const distinationRef = useRef()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries: ['places']
  })

  if(!isLoaded){
    
    return <h1>Loading....</h1>
  }

  // function to calculate distance and duration

  const calcMap = async () => {
    if(originRef.current.value === '' || distinationRef.current.value === ''){
      return
    } else {

    }

  }
  
  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'></Box>
      <GoogleMap 
      center={center}
      zoom={15}
      mapContainerStyle={{width: '100%', height: '100%'}}
      onLoad={map => setMap(map)}
      >
        {/* onPositionChanged property is available??? */}
        <Marker position={center}/> 
      </GoogleMap>
      <Box
        p={4}
        borderRadius='lg'
        mt={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='modal'
      >
        <HStack spacing={4}>
          <Autocomplete>
          <Input type='text' placeholder='Origin' ref={originRef}/>
          </Autocomplete>
          <Autocomplete>
          <Input type='text' placeholder='Destination' ref={distinationRef}/>
          </Autocomplete>
          <ButtonGroup>
            <Button colorScheme='pink' type='submit'>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={() => alert(123)}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: </Text>
          <Text>Duration: </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => map.panTo(center)}
          />
        </HStack>
      </Box>
    </Flex>
  )
}

export default App
