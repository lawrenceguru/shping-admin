import useSWR from 'swr'
import { PAM_API } from 'constants/url'
import api from '../api'

const getLevel = (category, list) => {
  if (category.parents === null || category.parents[0] === '0') return 1
  const parent = list.find(item => item.id === category.parents[0])
  if (parent) return getLevel(parent, list) + 1
  return 1
}

const getTreeCategories = list => {
  if (list === null) return []
  if (list === undefined) return []
  const childrenList = list
    .map(item => {
      const category = item
      category.children = list.filter(cItem => {
        return (
          Array.isArray(cItem.parents) &&
          cItem.parents.filter(parentId => {
            return parentId === item.id && item.id !== '0'
          }).length > 0
        )
      })
      category.level = getLevel(category, list)
      return category
    })
    .filter(item => item.id !== '0')
  const maxLevelItem = childrenList.reduce(function(prev, current) {
    return prev.level > current.level ? prev : current
  })
  const levels = Array.from(Array(maxLevelItem.level).keys())
  const levelPerItems = levels.map(level => {
    return childrenList.filter(item => item.level === level + 1)
  })
  const maxChildrenItem = childrenList.reduce(function(prev, current) {
    return prev.children.length > current.children.length ? prev : current
  })
  const numberLength = maxChildrenItem.children.length
  const treeItems = []
  let position
  for (let i = 0; i < levelPerItems[0].length; i += 1) {
    position = numberLength ** 4 * (i + 1)
    levelPerItems[0][i].position = position
    treeItems.push(levelPerItems[0][i])
    if (levelPerItems[1] && levelPerItems[1].length > 0 && levelPerItems[0][i].children.length > 0) {
      for (let j = 0; j < levelPerItems[1].length; j += 1) {
        if (levelPerItems[0][i].children.find(item => item.id === levelPerItems[1][j].id)) {
          position = numberLength ** 4 * (i + 1) + numberLength ** 3 * (j + 1)
          levelPerItems[1][j].position = position
          levelPerItems[1][j].main_category = levelPerItems[0][i]
          treeItems.push(levelPerItems[1][j])
          if (levelPerItems[2] && levelPerItems[2].length > 0 && levelPerItems[1][j].children.length > 0) {
            for (let k = 0; k < levelPerItems[2].length; k += 1) {
              if (levelPerItems[1][j].children.find(item => item.id === levelPerItems[2][k].id)) {
                position = numberLength ** 4 * (i + 1) + numberLength ** 3 * (j + 1) + numberLength ** 2 * (k + 1)
                levelPerItems[2][k].position = position
                levelPerItems[2][k].main_category = levelPerItems[0][i]
                levelPerItems[2][k].sub1_category = levelPerItems[1][j]
                treeItems.push(levelPerItems[2][k])
                if (levelPerItems[3] && levelPerItems[3].length > 0 && levelPerItems[2][j].children.length > 0) {
                  for (let l = 0; l < levelPerItems[3].length; l += 1) {
                    if (levelPerItems[2][k].children.find(item => item.id === levelPerItems[3][l].id)) {
                      position =
                        numberLength ** 4 * (i + 1) +
                        numberLength ** 3 * (j + 1) +
                        numberLength ** 2 * k +
                        numberLength * (l + 1)
                      levelPerItems[3][l].position = position
                      levelPerItems[3][l].main_category = levelPerItems[0][i]
                      levelPerItems[3][l].sub1_category = levelPerItems[1][j]
                      levelPerItems[3][l].sub2_category = levelPerItems[2][k]
                      treeItems.push(levelPerItems[3][l])
                      if (levelPerItems[4] && levelPerItems[4].length > 0 && levelPerItems[3][k].children.length > 0) {
                        for (let m = 0; m < levelPerItems[4].length; m += 1) {
                          if (levelPerItems[3][l].children.find(item => item.id === levelPerItems[4][m].id)) {
                            position =
                              numberLength ** 4 * (i + 1) +
                              numberLength ** 3 * (j + 1) +
                              numberLength ** 2 * (k + 1) +
                              numberLength * (l + 1) +
                              m +
                              1
                            levelPerItems[4][m].position = position
                            levelPerItems[4][m].main_category = levelPerItems[0][i]
                            levelPerItems[4][m].sub1_category = levelPerItems[1][j]
                            levelPerItems[4][m].sub2_category = levelPerItems[2][k]
                            treeItems.push(levelPerItems[4][m])
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return treeItems.sort((a, b) => {
    if (a.postion < b.postion) {
      return -1
    }
    if (a.postion > b.postion) {
      return 1
    }
    return 0
  })
}
export { getTreeCategories }
export default function useCategories() {
  const { data, mutate, error } = useSWR(`${PAM_API}/api/categories`, api.getFetcher)
  return {
    categories: data,
    mutate,
    error
  }
}
