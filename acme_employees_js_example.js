const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];

const spacer = (text)=> {
  if(!text){
    return console.log('');
  }
  const stars = new Array(5).fill('*').join('');
  console.log(`${stars} ${text} ${stars}`);
}

//-----------------SOLUTIONS FOR FUNCTIONS BELOW-----------------//

//Solution for findEmployeeByName

function findEmployeeByName(name, list) {
  return list.find((employee) => employee.name === name)
}

//Solution for findManagerFor

function findManagerFor(employee, list) {
  return list.find((employ) => employee.managerId === employ.id)
}

//Solution for findCoworkersFor

function findCoworkersFor(employee, list) {
  return list.filter((employ) => employee.name !== employ.name && employee.managerId === employ.managerId)
}

//Solution for findManagementChainForEmployee

function findManagementChainForEmployee(employee, list) {
  let bossID = employee.managerId;
  return list.reverse().filter((employ) => {
      if (employ.id === bossID) {
          bossID = employ.managerId;
          return employ
      }
  }).reverse()
}

//Solution for generateManagementTree

function generateManagementTree(employees) {
  const manager = employees.find((employee) => !employee.managerId)
  return {...manager, reports: generateReports(manager, employees)}
}

function generateReports(manager, employees) {
  return employees
  .filter(employee => employee.managerId === manager.id)
  .reduce((acc, employee) => {
      acc.push({...employee, reports: generateReports(employee, employees)});
      return acc;
  }, [])
}

//Alternate Solution for generateManagementTree without helper function?

// function generateManagementTree(list, id = undefined) {
//     return list
//     .filter((employee) => employee.managerId === id)
//     .map((employee) => ({...employee, reports: generateManagementTree(list, employee.id)}))
// } 

//Solution for displayManagementTree

//I wasn't able to get the double and triple dashes to work, only single dashes

function displayManagementTree(tree) {
  return Object.values(tree).reduce((acc, curr) => {
    if (typeof curr === 'string') acc += curr + '\n';
    else if (Array.isArray(curr) && curr.length) {
      curr.forEach((obj) => {
        acc += '-' + displayManagementTree(obj)
      });
    }
    return acc
  }, '')
}

//-----------------SOLUTIONS FOR FUNCTIONS END-----------------//

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')

spacer('findManagerFor Shep Jr.')
//given an employee and a list of employees, return the employee who is the manager
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));/*
[ { id: 3, name: 'curly', managerId: 1 },
  { id: 99, name: 'lucy', managerId: 1 } ]
*/

spacer('');

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');


spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('');

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(generateManagementTree(employees));/*
moe
-larry
--shep
---shep Jr.
-curly
--groucho
---harpo
-lucy
*/