const URL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

const width = 1100;
const height = 600;

let categoryArr = []




const canva = d3.select("#canvas");
const legend = d3.select("#legend");
const tooltip = d3.select("#tooltip");


fetch(URL)
        .then(response => response.json())
        .then(gameInfo => {
            // document.querySelector(".loading-sheet").classList.add("visible")



            // console.log(gameInfo)

            let hierarchy = d3.hierarchy(gameInfo, el => el.children).sum(el => el.value).sort((el1, el2) => el2.value - el1.value);


            let treeMap = d3.treemap()
                            .size([width, height]);

            treeMap(hierarchy)

            let gameTiles = hierarchy.leaves()


            // canva.selectAll("rect")
            //      .data(gameTiles)
            //      .enter()
                 
            // console.log(gameTiles[0].data.category)

            let gElements = canva.selectAll("g")
                 .data(gameTiles)
                 .enter()
                 .append("g")
                 .attr("transform", game => `translate(${game["x0"]}, ${game["y0"]})`)

            gElements.append("rect")
                 .attr("class", "tile")
                 .attr("fill", game => {

                    let platform = game.data.category;

                    // console.log(platform)

                    switch(platform) {
                        case "Wii":
                          return "rgb(184, 239, 101)"
                          break;
                        case "DS":
                          return "grey"
                          break;
                        case "X360":
                            return "limegreen"
                            break;
                        case "GB":
                            return "violet"
                            break;    
                        case "NES":
                            return "red"
                            break;
                        case "PS3":
                            return "fuchsia"
                            break;
                        case "NES":
                            return "navy"
                            break;
                        case "PS2":
                            return "aqua"
                            break;   
                        case "3DS":
                            return "maroon"
                            break;
                        case "PS4":
                            return "darkorchid"
                            break;
                        case "SNES":
                            return "deeppink"
                            break;
                        case "PS":
                            return "goldenrod"
                            break;
                        case "N64":
                            return "khaki"
                            break;
                        case "GBA":
                            return "lightgoldenrodyellow"
                            break;   
                        case "XB":
                            return "lightsalmon"
                            break;
                        case "PC":
                            return "lightsteelblue"
                            break;
                        case "2600":
                            return "mediumpurple"
                            break;
                        case "PSP":
                            return "tomato"
                            break;
                        case "XOne":
                            return "springgreen"
                            break;         
                        default:
                            return "darkgreen"
                      }


                 })
                 .attr("data-name", game => game.data.name)
                 .attr("data-category", game => game.data.category)
                 .attr("data-value", game => game.data.value)
                 .attr("width", game => game.x1 - game.x0)
                 .attr("height", game => game.y1 - game.y0)
                 .attr("stroke", "rgba(0, 0, 0, 0.534)")
                 .on("mouseover", (e, game) => {
                     tooltip.style("visibility", "visible")
                            .text(game.data.name)
                            .attr("data-value", game.data.value)
                 })
                 .on("mouseout", (e, game) => {
                    tooltip.style("visibility", "hidden")
                            // .attr("data-value", "")
                            .text("")
                })


            gElements.append("text")
                     .selectAll('tspan')                                       
                     .data(game => game.data.name.split(/(?=[A-Z][^A-Z])/g))        
                     .enter()
                     .append('tspan')
                     .attr('x', 4)
                     .attr('y', (game, i) => 13 + 10 * i)        
                     .text(game => game);
                



            

            gameTiles.map(el => {
                if(categoryArr.indexOf(el.data.category) === -1) {
                    categoryArr.push(el.data.category)
                }
            })



            let legendRects = legend.selectAll("g")
                                    .data(categoryArr)
                                    .enter()
                                    .append("g")
                                    

            legendRects.append("rect")
                       .attr("class", "legend-item")
                       .attr("width", 30)
                       .attr("height", 30)
                       .attr("y", (el, i) => 40 * i)  
                       .attr("x", 30)
                       .attr("stroke", "black")
                       .attr("stroke-width", 2)
                       .attr("fill", (el) => {
                        
                        switch(el) {
                            case "Wii":
                              return "rgb(184, 239, 101)"
                              break;
                            case "DS":
                              return "grey"
                              break;
                            case "X360":
                                return "limegreen"
                                break;
                            case "GB":
                                return "violet"
                                break;    
                            case "NES":
                                return "red"
                                break;
                            case "PS3":
                                return "fuchsia"
                                break;
                            case "NES":
                                return "navy"
                                break;
                            case "PS2":
                                return "aqua"
                                break;   
                            case "3DS":
                                return "maroon"
                                break;
                            case "PS4":
                                return "darkorchid"
                                break;
                            case "SNES":
                                return "deeppink"
                                break;
                            case "PS":
                                return "goldenrod"
                                break;
                            case "N64":
                                return "khaki"
                                break;
                            case "GBA":
                                return "lightgoldenrodyellow"
                                break;   
                            case "XB":
                                return "lightsalmon"
                                break;
                            case "PC":
                                return "lightsteelblue"
                                break;
                            case "2600":
                                return "mediumpurple"
                                break;
                            case "PSP":
                                return "tomato"
                                break;
                            case "XOne":
                                return "springgreen"
                                break;         
                            default:
                                return "darkgreen"
                       }})

            legendRects.append("text")
                       .text(el => `${el}`)
                       .attr("y", (el, i) => 40 * i)  
                       .attr("x", 80)
                       .attr("width", 30)
                       .attr("height", 30)
                       .attr("transform",`translate(5, 22)`)
                       


            // console.log(legendRects)


            document.querySelector(".loading-sheet").classList.add("visible")
        })
        .catch(err => console.log(err))