import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IVideo } from '../models/IVideo'

export const videoApi = createApi({
    reducerPath: 'videoApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    endpoints: (builder) => ({
        getVideo: builder.query<IVideo[], null>({
            query: () => `/videos`
        })
    })
})

export const { useGetVideoQuery } = videoApi