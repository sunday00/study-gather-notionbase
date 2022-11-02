import {default as api} from "axios";

const baseHeaders = () => ({
  Authorization: `Bearer ${process.env.NOTION_KEY}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2021-08-16',
})

const buildProperties = (data) => {
  const properties = {
    [data.primary.name]: {
      title: [{
        text: { content: data.primary.content }
      }]
    },
  }

  const {primary, ...rest} = data

  for(let property in rest) {
    switch (rest[property].type){
      case 'select':
        properties[property] = {
          select: {
            name: rest[property].content
          }
        }
        break
      case 'number':
        properties[property] = {
          number: rest[property].content
        }
        break
      case 'date':
        properties[property] = {
          date: {
            start: rest[property].content
          }
        }
        break
      case 'relation':
        properties[property] = {
          relation: [{
            id: rest[property].content.id,
            database_id: rest[property].content.database_id,
            single_property: {
              name: rest[property].content.single_property.name,
            }
          }]
        }
        break
      default :
        properties[property] = {
          rich_text: [{
            text: { content: rest[property].content }
          }]
        }
    }
  }

  console.log(JSON.stringify(properties, null, 2))

  return properties
}

const buildRestQuery = ({primary, ...rest}) => {
  const result = [
    {
      property: "title",
      title: { equals: primary }
    }
  ]

  for(let property in rest) {
    switch (rest[property].type) {
      default:
        result.push({
          property: property,
          rich_text: {
            equals: rest[property].content
          }
        })
    }
  }

  console.log(result)

  return result
}

const buildEndsQuery = ({primary, ...rest}) => {
  const result = [
    {
      property: "title",
      title: { ends_with: primary }
    }
  ]

  for(let property in rest) {
    switch (rest[property].type) {
      default:
        result.push({
          property: property,
          rich_text: {
            equals: rest[property].content
          }
        })
    }
  }

  return result
}

export const post = ({db, ...data}) => api({
  method: 'POST',
  url: process.env.NOTION_HOST + '/pages',
  data: {
    parent: {
      database_id: db,
    },
    properties: buildProperties(data)
  },
  headers: baseHeaders(),
})

export const show = ({db, ...query}) => api({
  method: 'POST',
  url: `${process.env.NOTION_HOST}/databases/${db}/query`,
  data: {
    filter: {
      or: buildRestQuery(query)
    },
  },
  headers: baseHeaders(),
})

export const showWhere = ({db, ...query}) => api({
  method: 'POST',
  url: `${process.env.NOTION_HOST}/databases/${db}/query`,
  data: {
    filter: {
      and: buildRestQuery(query)
    },
  },
  headers: baseHeaders(),
})

export const showEnds = ({db, ...query}) => api({
  method: 'POST',
  url: `${process.env.NOTION_HOST}/databases/${db}/query`,
  data: {
    filter: {
      or: buildEndsQuery(query)
    },
  },
  headers: baseHeaders(),
})

export const getByRangeDate = async (db, [start, end]) => {
  let data = {
    filter: {
      and: [
        {
          property: "date",
          date: {
            on_or_after: start
          }
        },
        {
          property: "date",
          date: {
            on_or_before: end
          }
        },
      ]
    }
  }

  return await api({
    method: 'POST',
    url: `${process.env.NOTION_HOST}/databases/${db}/query`,
    data,
    headers: baseHeaders(),
  })
}

export const deleteById = ({id}) => api({
  method: 'DELETE',
  url: `${process.env.NOTION_HOST}/blocks/${id}`,
  headers: baseHeaders()
})

export const patchById = async (body) => api({
  method: 'PATCH',
  url: `${process.env.NOTION_HOST}/blocks/${body.blockId}`,
  data: {
      table: {

      }
  },
  headers: baseHeaders()
})