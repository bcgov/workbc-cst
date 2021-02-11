import {IndustryModel, IndustryData, FilterTypeModel} from './dataTypes'

function modifyIndustry(data: FilterTypeModel, id: number) {
    return {title: data.value, value: id+':'+data.id, key: id+':'+data.id}
}

export function modifyIndustryData(industriesData: IndustryModel[]): IndustryData[] {
   let modifiedIndustryData = [{title: 'All', value: 'All', key: 'All', children: []}]
    industriesData.forEach(industry => {
    const children = industry.subIndustries.map(item => modifyIndustry(item, industry.id))
        modifiedIndustryData.push({title: industry.value, value: industry.id.toString(), key: industry.id.toString(), children: children})
    })
    return modifiedIndustryData
}