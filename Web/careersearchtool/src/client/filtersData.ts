import {IndustryModel, IndustryData, FilterTypeModel, OccupationSummary, Text} from './dataTypes'

export const titleLength = 67

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

export const filtersPopOverVisible = {
    region: false,
    education: false,
    occupationalInterest: false,
    industry: false,
    occupationalCategory: false,
    jobType: false,
    keywords: false
}

export function format(value: number): string {
    if (value != undefined) {
        if (value < 0) {
            value = 0;
        }
        return value.toLocaleString("en-ca");
    }
    else
    {
        return '';
    }
}

export function getHeaderTitle(careerObj: OccupationSummary) {
    let nocTitle = careerObj.title 
    let nocCode =  ' (' + 'NOC ' + careerObj.noc + ')'
    if (nocTitle.length > titleLength) {
        nocTitle = nocTitle.slice(0, titleLength) + '...'
        nocCode = ''
    } else if (nocTitle.length + nocCode.length > titleLength) {
        nocTitle = nocTitle
        nocCode = nocCode.slice(0, titleLength - nocTitle.length) + '...'
    }
    return {length: nocTitle.length + nocCode?.length , title: nocTitle, code: nocCode}
}

export function removeTags(str) : Text {
   return {display_text: str.slice(0, 250), remaining_text: str.slice(250, str.length)}
}