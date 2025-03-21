import { initializeApp } from 'firebase/app'
import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config'

const firebaseConfig = {
    apiKey: 'AIzaSyB_KWZi8mf1IdvDWsNg286_X6SzzDOIuiY',
    authDomain: 'maso-62fa1.firebaseapp.com',
    projectId: 'maso-62fa1',
    storageBucket: 'maso-62fa1.appspot.com',
    messagingSenderId: '1005137198174',
    appId: '1:1005137198174:web:39ab06d672c94fdde1c8cf',
    measurementId: "G-9XC2BVQRKJ"
}

const app = initializeApp(firebaseConfig)

const remoteConfig = getRemoteConfig(app)
remoteConfig.settings.minimumFetchIntervalMillis = 60000

export async function getWip()
{
    await fetchAndActivate(remoteConfig)
    return getValue(remoteConfig, 'wip').asBoolean()
}