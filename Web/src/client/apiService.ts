import {FilterType, 
        FilterTypeModel,
        FilterDataResponse,
        OccupationModel,
        OccupationalListResponse,
        FilterOccupationParams,
        OccupationSummaryResponse,
        OccupationSummary} from './dataTypes'
import {apiURLs} from './apiURLS'

import useSWR from 'swr'
import axios, {AxiosResponse} from 'axios'

function getFilterUrl(filterType: FilterType): string {
    let url = '';
    if (filterType === FilterType.region) {
      url = apiURLs.filterType.region
    } else if (filterType === FilterType.education) {
      url = apiURLs.filterType.education
    } else if (filterType === FilterType.occupational_interest) {
      url = apiURLs.filterType.occupational_interest
    } else if (filterType === FilterType.industry) {
      url = apiURLs.filterType.industry
    } else if (filterType === FilterType.occupational_group) {
      url = apiURLs.filterType.occupational_group
    } else if (filterType === FilterType.part_time_option) {
      url = apiURLs.filterType.part_time_option
    } else if (filterType === FilterType.annual_salary) {
      url = apiURLs.filterType.annual_salary
    }
    return url;
}

export async function getFilterData(filterUrl: string): Promise<FilterTypeModel[]> {
   try {
       if (!filterUrl) return Promise.resolve([])
       const response: AxiosResponse<FilterTypeModel[]> = await axios.get(filterUrl)
       return Array.isArray(response.data)? response.data : []
   } catch (error) {
       return []
   }
}

export function useGetFilterData (filterType: FilterType): FilterDataResponse {
    const filterUrl = getFilterUrl(filterType); // Fetches the right url to be used in API call
    const {data, isValidating, error } = useSWR<FilterTypeModel[]>(filterUrl, () => getFilterData(filterUrl), {})
    return {data, isValidating, isSettled: !!data || !!error}
}

export async function getOccupationsList(params: FilterOccupationParams): Promise<OccupationModel[]> {
  try {
    const response: AxiosResponse<OccupationModel[]> = await axios.get(apiURLs.occupations_list, {params})
    return Array.isArray(response.data)? response.data : []
  } catch (error) {
    return []
  }
}

export function useGetOccupationsList(params: FilterOccupationParams): OccupationalListResponse {
  const filterParams = JSON.stringify(params)
  const {data, isValidating, error} = useSWR<OccupationModel[]>(filterParams, () => getOccupationsList(params))
  return {data, isValidating, isSettled: !!data || !!error}
}

export async function getOccupationSummary(code: string): Promise<OccupationSummary[]> {
  try {
    if (!code || code === 'default') return Promise.resolve([])
    const response: AxiosResponse<OccupationSummary[]> = await axios.get(apiURLs.occupation_summary, {params: {nocs: code}})
    return Array.isArray(response.data)? response.data: []
  } catch (error) {
    return []
  }
}

export function useGetOccupationSummary(code: string): OccupationSummaryResponse {
  const {data, isValidating, error} = useSWR<OccupationSummary[]>(code, ()=> getOccupationSummary(code))
  return {data, isValidating, isSettled: !!data || !!error}
}