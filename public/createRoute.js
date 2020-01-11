function create_route(origin, destination, passenger_list)
{
    // var origin = "4225 Campus Dr, Irvine, CA 92612";
    // var destination = "680 California Ave, Irvine, CA 92617";
    // var passenger_list = ["4541 Campus Dr, Irvine, CA 92612", "4771 Campus Dr, Irvine, CA 92612", "1054 Stanford Irvine CA",
    //                 "5001 Newport Coast Dr, Irvine, CA 92603", ];
    var reformatted_origin = reformate_location(origin);
    var reformatted_destination= reformate_location(destination);
    for (let [index, passenger] of passenger_list.entries())
    {
        passenger_list[index] = reformate_location(passenger);
    }        
    var randomized_passenger_list = create_permutations(passenger_list);
    var shortest_permutation = find_shortest_permutation(randomized_passenger_list);
    var link = create_link(shortest_permutation);
}
