
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCZsSuX0Pb4Oz7pLiRuG8_jesTpI6yLGHs',
    Promise: Promise
  });

function reformat_location(location)
{
  var reformatted_location = "";
  var location_list = location.split(" ");
  for (var word = 0; word < location_list.length; word++)
  {
      reformatted_location = reformatted_location + location_list[word] + "+" ;
  }
  return reformatted_location;
}
  


const permutator = (inputArr) => {
  let result = [];
  const permute = (arr, m=[]) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i,1);
        permute(curr.slice(), m.concat(next))
      }
    }
  }
  permute(inputArr);
  return result;
}


function create_permutations(passenger_list, reformatted_origin, reformatted_destination)
{
  var randomized_passenger_list = permutator(passenger_list);
  for (var i = 0; i < randomized_passenger_list.length; i++)
  {
    randomized_passenger_list[i].unshift(reformatted_origin);
    randomized_passenger_list[i].push(reformatted_destination);
  }
  return  randomized_passenger_list;
}

async function get_time(first_location, second_location)
{
  console.log("LOCATIONS", first_location, second_location);
  var origins, destinations, time;
  await googleMapsClient.geocode({ address: first_location }).asPromise()
    .then((response) => {
        console.log("Location 1:", response);
         origins = {
            lat: response.json.results[0].geometry.location.lat,
            long: response.json.results[0].geometry.location.lng
         }
    }).catch((err) => {
        console.log(err);
    });
    await googleMapsClient.geocode({ address: second_location }).asPromise()
        .then((response) => {
          console.log("Location 2:", response);
          destinations = {
              lat: response.json.results[0].geometry.location.lat,
              long: response.json.results[0].geometry.location.lng
          }
        }).catch((err) => {
            console.log(err);
        });
        console.log("Location 3:", origins, destinations);
    await googleMapsClient.distanceMatrix({
        origins:  `${origins.lat},${origins.long}`,
    destinations: `${destinations.lat},${destinations.long}`,
        mode: 'driving' 
      }).asPromise().then((response) => {
        response = response.json;
        time = (response["rows"][0]["elements"][0]["duration"]["value"]);
      }).catch(err => console.log(err));
    return time;
}

async function get_length_of_perm(perm, combo_dict)
{
  console.log("PERMSDKFSDFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
  var value = 0;
  var total_duration = 0;
  for (var x in perm)
    console.log(perm[x]);
  while (value + 1 < perm.length)
  {

      console.log("PERM LOCATIONS:   ", perm[value], perm[value+1]);
      if ([perm[value], perm[value+1]] in combo_dict)
      {
          total_duration += combo_dict[perm[value], perm[value+1]];
      } 
      else
      {

            var duration = await get_time(perm[value], perm[value+1]).catch((err) => {
                console.log(err);
            });
          total_duration += duration;
          combo_dict[perm[value], perm[value+1]] = duration;
      }
          
      value += 1;
  }
      
  return total_duration;
}

async function find_shortest_permutation(randomized_passenger_list)
{
  var shortest_duration = Number.MAX_SAFE_INTEGER;
  var shortest_permutation;
  var combo_dict = {};
  for (var perm = 0; perm < randomized_passenger_list.length; perm++)
  {
    var duration = await get_length_of_perm(randomized_passenger_list[perm], combo_dict).catch((err) => {
            console.log(err);
        });
      // duration_list.push(duration);
      if (duration < shortest_duration)
      {
        shortest_duration = duration;
        shortest_permutation = randomized_passenger_list[perm];
      }
  }
  var link = "http://maps.google.com/maps/dir/";
  var pass_link = "";
  for (var index = 0; index < shortest_permutation.length; index++)
  {
    shortest_permutation[index] = reformat_location(shortest_permutation[index]);
  }        
  var sliced_pass_link = shortest_permutation.slice(1,-1);
  for (var x = 0; x < sliced_pass_link.length; x++)
  {
    pass_link += sliced_pass_link[x] + "/";
  }
  link = link + shortest_permutation[0] + "/" + pass_link + shortest_permutation[shortest_permutation.length-1];
  return link;
}

  
export async function main_loop(origin, destination, passenger_list)
{
  var randomized_passenger_list = create_permutations(passenger_list, origin, destination);
  var shortest_permutation_link = find_shortest_permutation(randomized_passenger_list);
  console.log("link: ", shortest_permutation_link);
  return (await shortest_permutation_link).toString();
}
