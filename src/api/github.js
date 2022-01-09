import request from 'axios'

export function getRepos(params) {
  return request({
    url: 'https://api.github.com/repos/chuzhixin/elephant-admin',
    method: 'get',
    params,
    timeout: 10000,
  })
}

export function getStargazers(params) {
  return request({
    url: 'https://api.github.com/repos/chuzhixin/elephant-admin/stargazers',
    method: 'get',
    params,
    timeout: 10000,
  })
}
