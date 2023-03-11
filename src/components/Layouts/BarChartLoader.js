import React from 'react'
import ContentLoader from 'react-content-loader'

const BarChartLoader = props => {
  return (
    <ContentLoader  viewBox="0 0 300 200" {...props}>
      <rect x="0" y="160" rx="0" ry="0" width="40" height="40" />
      <rect x="50" y="145" rx="0" ry="0" width="40" height="55" />
      <rect x="100" y="126" rx="0" ry="0" width="40" height="74" />
      <rect x="150" y="80" rx="0" ry="0" width="40" height="120" />
      <rect x="200" y="142" rx="0" ry="0" width="40" height="58" />
    </ContentLoader>
  )
}

BarChartLoader.metadata = {
  name: 'Phuong Dao',
  github: 'dao-phuong',
  description: 'Bar Chart',
  filename: 'BarChart',
}

export default BarChartLoader