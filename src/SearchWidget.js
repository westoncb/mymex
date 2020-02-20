import React, { PureComponent } from "react";
import SearchResults from './SearchResults.js';
import Util from './Util.js';
import './SearchWidget.css'
import { Icon, Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

export default class SearchWidget extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            results: props.results || [bookmarksTree],
            inputFocused: false
        }

        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)

        this.textInput = React.createRef();
    }

    handleFocus(e) {
        this.setState({ inputFocused: true })
    }

    handleBlur(e) {
        // this.setState({ inputFocused: false })
    }

    handleTextChange(e) {
        const string =  e.target.value || ""
        const results = this.getFilterResults(string)

        if (string !== "") {
            this.setState({ results })
        } else {
            this.setState({results: [bookmarksTree]})
        }
    }

    getFilterResults(string) {
        const results = []
        const filterFunc = (node) => {
            if (node.name.toLowerCase().includes(string.toLowerCase())) {
                results.push(node)
                return true
            } else {
                return false
            }
        }
        Util.walkDepthFirst(bookmarksTree, filterFunc)

        const mergedResults = this.mergeSharedParentResults(results);
        // const groupedChildrenResults = this.groupResultChildren(mergedResults)

        return mergedResults
    }

    mergeSharedParentResults(results) {
        const map = {}
        const newResults = []

        results.forEach(result => {
            const parentPath = Util.nodeToPath(result, 1, 1)

            if (map[parentPath]) {
                map[parentPath].push(result)
            } else {
                map[parentPath] = [result]
            }
        });

        Object.keys(map).forEach(key => {
            const children = map[key]
            
            newResults.push({id: Math.random(), path: key, children, collapsed: false})
        })

        return newResults
    }

    groupResultChildren(results) {
        const groupedChildrenResults = results.map(result => {
            const allChildren = result.children
            const folders = []
            const leaves = []

            allChildren.forEach(child => {
                if (Util.isLeaf(child)) {
                    leaves.push(child)
                } else {
                    folders.push(child)
                }
            })

            return {...result, children: {folders, leaves}}
        })

        return groupedChildrenResults
    }

    render() {
        return (
            <div className="search-widget-container" onFocus={this.handleFocus} onBlur={this.handleBlur}>
                <div className="input-results-group">
                  <input className="search-input" type="text" ref={this.textInput} onChange={this.handleTextChange} />
                  <SearchResults results={this.state.results} visible={this.state.inputFocused} openItemFunc={this.props.openItemFunc} />
                </div>

              <Button>
                 <Icon icon={IconNames.DIAGRAM_TREE} iconSize={42} />
              </Button>
            </div>
        )
    }
}

const data = `
{
   "checksum": "99df6cbbdd1da3e19f83f515ac0d7920",
   "roots": {
      "bookmark_bar": {
         "children": [ {
            "date_added": "13176946617672651",
            "guid": "c94c1735-2763-4c85-835d-22a9b765fd18",
            "id": "1125",
            "name": "Bookmarks",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "chrome://bookmarks/"
         }, {
            "children": [ {
               "date_added": "13179416290198577",
               "guid": "79368f5a-8c84-45b2-8880-2cb3ea769ef5",
               "id": "1156",
               "meta_info": {
                  "last_visited_desktop": "13179416290212916"
               },
               "name": "Example Fit Polygon - BoofCV",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://boofcv.org/index.php?title=Example_Fit_Polygon"
            }, {
               "date_added": "13179416309607047",
               "guid": "03bcba7b-a37c-4a40-a8f6-d9e62b5960e6",
               "id": "1158",
               "meta_info": {
                  "last_visited_desktop": "13179416309619103"
               },
               "name": "javascript - Create shapes from Canny Edge Detection in Canvas - Stack Overflow",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://stackoverflow.com/questions/19220186/create-shapes-from-canny-edge-detection-in-canvas"
            }, {
               "date_added": "13179416314913353",
               "guid": "b38d430f-a59f-480c-8ff3-bb2ec76789d5",
               "id": "1159",
               "meta_info": {
                  "last_visited_desktop": "13179416314916584"
               },
               "name": "Home · JOSM/areaselector Wiki",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/JOSM/areaselector/wiki"
            } ],
            "date_added": "13179416305704520",
            "date_modified": "13179416480341388",
            "guid": "10936b15-adf1-40ec-9d61-2c94dd41acfb",
            "id": "1157",
            "name": "Di/BAF",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13183614681526056",
               "guid": "0c8d51e7-1d2b-41e0-9bda-99f83c98daf8",
               "id": "1204",
               "meta_info": {
                  "last_visited_desktop": "13183614681526977"
               },
               "name": "Contraction hierarchies - Wikipedia",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://en.wikipedia.org/wiki/Contraction_hierarchies"
            } ],
            "date_added": "13183614719274345",
            "date_modified": "13183614719274843",
            "guid": "bd76a1fb-bdfb-40ca-8e93-d565d9e18f53",
            "id": "1205",
            "name": "Value-Space project",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "children": [ {
                  "date_added": "13082686715262610",
                  "guid": "8353a725-fb26-498f-9d24-27174f2deb68",
                  "id": "783",
                  "name": "Understanding EXC_BAD_ACCESS | Lou Franco: code, apps, and writings",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://loufranco.com/blog/understanding-exc_bad_access"
               } ],
               "date_added": "13082686681276501",
               "date_modified": "13083113735493573",
               "guid": "9735f707-f8cd-4c6c-a783-dac679b1ceb9",
               "id": "782",
               "name": "general info",
               "sync_transaction_version": "1",
               "type": "folder"
            } ],
            "date_added": "13082686649868075",
            "date_modified": "13082686649868075",
            "guid": "755c30de-284b-4bde-af30-6cfb86789505",
            "id": "781",
            "name": "iOS Dev",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13069981829240000",
               "guid": "4d32d501-5a2c-4102-b334-389fd7155c29",
               "id": "738",
               "name": "Programmable Matter Main/Research Thrusts",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://groups.csail.mit.edu/drl/ProgrammableMatter/Main/ResearchThrusts#Simulation"
            }, {
               "date_added": "13069988361509000",
               "guid": "00c5473c-87f5-4796-9232-6c6af88dc5a5",
               "id": "685",
               "name": "DRL - Past Projects",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://groups.csail.mit.edu/drl/wiki/index.php?title=Past_Projects"
            }, {
               "date_added": "13069991182677000",
               "guid": "323e1811-3159-43a5-8b35-5311c565e547",
               "id": "686",
               "name": "MSR/MIT Theory Reading Group",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://people.csail.mit.edu/madhu/reading-group/"
            }, {
               "date_added": "13069994846287000",
               "guid": "138694cf-eb92-4ef2-8c0f-f7dbd6e0ae1b",
               "id": "687",
               "name": "Groups | MIT CSAIL",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.csail.mit.edu/research/activities/activities.php#systems"
            }, {
               "date_added": "13069995388222000",
               "guid": "bd4edfb5-f382-4849-942a-34bc1093cd92",
               "id": "688",
               "name": "Gallaugher - Boston College",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.bc.edu/schools/csom/faculty/bios/gallaugher.html"
            }, {
               "date_added": "13069996116449000",
               "guid": "89f74314-e321-4504-8e31-5a2b60fe0fa8",
               "id": "689",
               "name": "Hitchhiker's Guide to Boston Tech",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.bostontechguide.com/"
            }, {
               "date_added": "13069998048030000",
               "guid": "c25e229f-4084-4b04-84db-d31a7f61f749",
               "id": "690",
               "name": "C3 & CIC Events | cambridgecowork",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://cambridgecowork.wordpress.com/c3-events/"
            }, {
               "date_added": "13070000018231000",
               "guid": "206f1770-e52f-4ed3-88ad-1006aafd52e7",
               "id": "691",
               "name": "Dragon Innovation",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://dragoninnovation.com/"
            }, {
               "date_added": "13071049253487000",
               "guid": "55731379-92df-443d-a5a8-1717ae72cfed",
               "id": "712",
               "name": "Desmos | Careers",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.desmos.com/careers"
            }, {
               "date_added": "13118014856074353",
               "guid": "11a9e703-33b3-4311-a013-2f6739e0f405",
               "id": "837",
               "meta_info": {
                  "last_visited_desktop": "13137625961945541"
               },
               "name": "WebGL Jobs",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.webgljobs.com/"
            }, {
               "date_added": "13118016215521435",
               "guid": "9016923c-e6bf-41b6-aadb-b320a8d6be56",
               "id": "838",
               "name": "Harvard University - Search results",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://sjobs.brassring.com/TGWebHost/searchresults.aspx?SID=^DmiIOeWFJngQtCjqD0DYlxfJS1EjebObIriDDVWh1OY1DrPVKSf_slp_rhc_xrD65TbY_slp_rhc_3eU"
            }, {
               "date_added": "13118016238263492",
               "guid": "8ce5c300-393e-4c77-9559-fcfed45dde74",
               "id": "839",
               "name": "Harvard University - Search jobs",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://sjobs.brassring.com/TGWebHost/searchopenings.aspx"
            } ],
            "date_added": "13069981808557547",
            "date_modified": "13125502932057509",
            "guid": "3e1a5761-922f-4dec-8b32-cad6f000357e",
            "id": "683",
            "name": "Career Prospects",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "children": [ {
                  "date_added": "13032776176813552",
                  "guid": "70a36fc3-2cde-4ab2-a1cb-55dc54505a63",
                  "id": "512",
                  "name": "Shader Toy",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://www.iquilezles.org/apps/shadertoy/index2.html"
               }, {
                  "date_added": "13032776243126151",
                  "guid": "736929fd-7882-44b4-aef7-63161ce0e81d",
                  "id": "513",
                  "name": "Iñigo Quilez :: fractals, computer graphics, mathematics, demoscene and more",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://www.iquilezles.org/default.html"
               }, {
                  "date_added": "13032841453590008",
                  "guid": "b726a1e2-4034-481c-8d87-8cfc263f5190",
                  "id": "514",
                  "name": "Learning Modern 3D Graphics Programming (online book)",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://www.arcsynthesis.org/gltut/index.html"
               }, {
                  "date_added": "13033196086316440",
                  "guid": "0de94ac1-e167-4c0e-a3b8-f1f4a862eda4",
                  "id": "515",
                  "name": "Matrix and Quaternion FAQ",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://www.flipcode.com/documents/matrfaq.html"
               }, {
                  "children": [ {
                     "date_added": "13043993298208406",
                     "guid": "fd48eaa2-b1f3-4e59-b24f-bd4c175eea69",
                     "id": "517",
                     "name": "Cook-Torrance Sample",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "https://www.shadertoy.com/view/lsXSz7"
                  }, {
                     "date_added": "13043993422755814",
                     "guid": "a18c7070-bfa8-45aa-80af-8a09fdbf0d7e",
                     "id": "518",
                     "name": "Bleepy blocks",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "https://www.shadertoy.com/view/MsXSzM"
                  }, {
                     "date_added": "13043993883144834",
                     "guid": "aeb8c607-6769-454e-96ae-6d40a167b6d1",
                     "id": "519",
                     "name": "Raymarching Box",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "https://www.shadertoy.com/view/ldsSRn"
                  }, {
                     "date_added": "13043993965425589",
                     "guid": "e74a38c5-e738-4418-956e-ac0ed83e1db7",
                     "id": "520",
                     "meta_info": {
                        "last_visited_desktop": "13174343964315107"
                     },
                     "name": "Cavern game",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "https://www.shadertoy.com/view/MsXXRr"
                  }, {
                     "date_added": "13043994087277138",
                     "guid": "81970e2f-8b06-4d49-95e6-95c94077174c",
                     "id": "521",
                     "name": "Electric Sinusoid (glow line)",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "https://www.shadertoy.com/view/XdXXzr"
                  }, {
                     "date_added": "13043994202030637",
                     "guid": "11770eca-9163-468b-a07f-3a4f2fa1673a",
                     "id": "522",
                     "name": "The cubitree",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "https://www.shadertoy.com/view/4dXSzn"
                  }, {
                     "date_added": "13043994344486275",
                     "guid": "b5b867b9-6915-47ce-a43e-d8a70613f35f",
                     "id": "523",
                     "meta_info": {
                        "last_visited_desktop": "13174277797368723"
                     },
                     "name": "Star Nest",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "https://www.shadertoy.com/view/4dfGDM"
                  }, {
                     "date_added": "13043994541984418",
                     "guid": "46735d99-1e9e-4bf5-b2ab-8ec99ada5e22",
                     "id": "524",
                     "meta_info": {
                        "last_visited_desktop": "13173772283780948"
                     },
                     "name": "Voronoi - distances",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "https://www.shadertoy.com/view/ldl3W8"
                  }, {
                     "date_added": "13043994646182685",
                     "guid": "37a158a3-8f97-4a42-81d9-929ecb3f927e",
                     "id": "525",
                     "name": "Truchet Tentacles",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "https://www.shadertoy.com/view/ldfGWn"
                  }, {
                     "date_added": "13043994992257957",
                     "guid": "73823f56-2183-4183-820c-c7dcefeb309b",
                     "id": "526",
                     "name": "Vector Graphic",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "https://www.shadertoy.com/view/XsXGzj"
                  }, {
                     "date_added": "13032751615835938",
                     "guid": "b0238aba-1d00-4a09-8951-63718abb2690",
                     "id": "527",
                     "meta_info": {
                        "last_visited_desktop": "13176212182281125"
                     },
                     "name": "Monster(shadertoy)",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "https://www.shadertoy.com/view/4sX3R2"
                  } ],
                  "date_added": "13044228854746896",
                  "date_modified": "13188992763414080",
                  "guid": "49598ba3-a7a6-41cf-94f8-dda650733bc0",
                  "id": "516",
                  "name": "Examples",
                  "sync_transaction_version": "1",
                  "type": "folder"
               }, {
                  "date_added": "13071049784155000",
                  "guid": "d60c3dd2-d617-4b37-a809-2ee23f055e73",
                  "id": "713",
                  "name": "GLSL Book",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://patriciogonzalezvivo.com/2015/thebookofshaders/"
               }, {
                  "date_added": "13074380851646000",
                  "guid": "9143bca0-769a-49eb-941e-8f8ab981f853",
                  "id": "754",
                  "name": "Shadershop",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://tobyschachman.com/Shadershop/"
               }, {
                  "date_added": "13083113735493573",
                  "guid": "a92a02bb-a135-40b2-a698-d0eed1f002e7",
                  "id": "784",
                  "meta_info": {
                     "last_visited_desktop": "13179971814603862"
                  },
                  "name": "glsl-lighting-walkthrough",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://github.com/stackgl/glsl-lighting-walkthrough"
               }, {
                  "date_added": "13135196883934150",
                  "guid": "af6a8621-b51d-433b-8144-f025a7012ea9",
                  "id": "928",
                  "meta_info": {
                     "last_visited_desktop": "13135196883948804"
                  },
                  "name": "Understanding Julia and Mandelbrot Sets",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://www.karlsims.com/julia.html"
               }, {
                  "date_added": "13135631427115477",
                  "guid": "cbbce457-7919-48a1-9994-5e46ee153dab",
                  "id": "931",
                  "meta_info": {
                     "last_visited_desktop": "13135631427135099"
                  },
                  "name": "Amazon.com: In Over Our Heads: The Mental Demands of Modern Life (9780674445888): Robert Kegan: Books",
                  "tags": ["test", "test2"],
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://www.amazon.com/Over-Our-Heads-Mental-Demands/dp/0674445880/ref=sr_1_1?ie=UTF8&qid=1491157189&sr=8-1&keywords=in+over+our+heads#customerReviews"
               }, {
                  "date_added": "13164594309420441",
                  "guid": "f573a404-0e0b-4fca-adca-00dba2c5427c",
                  "id": "1069",
                  "meta_info": {
                     "last_visited_desktop": "13164594309429852"
                  },
                  "name": "Antialiased Cel Shading at The Little Grasshopper",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://prideout.net/blog/?p=22"
               }, {
                  "date_added": "13206245147625047",
                  "guid": "a08790eb-3ecf-49f3-8952-6e26ffa91fed",
                  "id": "1408",
                  "name": "What’s up with my branch on GPU? | Anton Schreiner",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://aschrein.github.io/jekyll/update/2019/06/13/whatsup-with-my-branches-on-gpu.html"
               }, {
                  "date_added": "13206931241716010",
                  "guid": "b56d49f6-a261-4777-88f1-6d261b9e385a",
                  "id": "1409",
                  "name": "Here's how to make a stylized fire shader, that can do some other effects too! #gamedev #unity3D #indiedev Shader code in first reply! More stuff > https://t.co/FqAsMb9Plg… https://t.co/PvXDYWO3Im",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://twitter.com/minionsart/status/964257071423283200"
               }, {
                  "date_added": "13207988635588766",
                  "guid": "34b23e14-24e4-4d50-98c8-83d70f04dc87",
                  "id": "1412",
                  "name": "ShaderLesson5 · mattdesl/lwjgl-basics Wiki",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://github.com/mattdesl/lwjgl-basics/wiki/shaderlesson5"
               }, {
                  "date_added": "13211631040771450",
                  "guid": "8498becf-986c-4ab8-a98d-cc6105693b4d",
                  "id": "1447",
                  "name": "LIVE Shader Deconstruction :: happy jumping - YouTube",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://www.youtube.com/watch?v=Cfe5UQ-1L9Q"
               }, {
                  "date_added": "13216859707929432",
                  "guid": "2401ffe7-96f1-49b4-ae33-53d3faf97e4d",
                  "id": "1488",
                  "name": "GPU Optimization for Games",
                  "type": "url",
                  "url": "https://gist.github.com/silvesthu/505cf0cbf284bb4b971f6834b8fec93d"
               } ],
               "date_added": "13032776202853410",
               "date_modified": "13216902925934564",
               "guid": "a10c29ff-e27f-43a7-95c2-d2b17a32cc68",
               "id": "509",
               "name": "Shader stuff",
               "sync_transaction_version": "1",
               "type": "folder"
            }, {
               "date_added": "13044228896838136",
               "guid": "fa061e5e-d32d-4759-9495-271778dcb0eb",
               "id": "510",
               "name": "Maks Ovsjanikov's homepage",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.lix.polytechnique.fr/~maks/publications.html"
            }, {
               "date_added": "13044232695832925",
               "guid": "614117ff-bbf9-4fe9-b677-dd7204308cde",
               "id": "511",
               "name": "twak's blog",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://twak.blogspot.com/"
            }, {
               "date_added": "13061811179994503",
               "guid": "0f8c0d07-940b-428a-9b6b-f90a7d4c2abb",
               "id": "589",
               "name": "Fundamentals of Computer Graphics: Peter Shirley, Michael Ashikhmin, Steve Marschner: 9781568814698: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Fundamentals-Computer-Graphics-Peter-Shirley/dp/1568814690/ref=sr_1_1?ie=UTF8&qid=1417337562&sr=8-1&keywords=computer+graphics+fundamentals"
            }, {
               "children": [ {
                  "date_added": "13072734585987000",
                  "guid": "25b4b0d4-f503-4258-8b3b-11f914f843cc",
                  "id": "724",
                  "name": "on by mercury @ Revision 2015 [60 FPS] - YouTube",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://www.youtube.com/watch?v=15P3SkxJB9g"
               } ],
               "date_added": "13072734622762607",
               "date_modified": "13072822295497662",
               "guid": "c953f4c3-d189-4e4b-98b6-33480e140046",
               "id": "725",
               "name": "Inspiration",
               "sync_transaction_version": "1",
               "type": "folder"
            }, {
               "date_added": "13072822295497000",
               "guid": "536bc096-c5cb-4fa1-ad81-5e2760b2040f",
               "id": "726",
               "name": "Let it glow! - Dynamically adding outlines to characters | LÖVE • Community Blogs",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://blogs.love2d.org/content/let-it-glow-dynamically-adding-outlines-characters"
            }, {
               "date_added": "13072837344203000",
               "guid": "5e9a67cd-3f45-463a-aa27-6d6b9a2f8aed",
               "id": "727",
               "name": "WebGL Fundamentals",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://webglfundamentals.org/"
            }, {
               "date_added": "13074465597721000",
               "guid": "3c459ebc-dcd7-427a-9690-83fe2c349364",
               "id": "755",
               "meta_info": {
                  "last_visited_desktop": "13185317098738212"
               },
               "name": "Keenan Crane",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.cs.columbia.edu/~keenan/"
            }, {
               "date_added": "13083975516308589",
               "guid": "dc294842-befa-45a9-8f89-215cd7252275",
               "id": "792",
               "name": "SIGGRAPH 2015 Course: Physically Based Shading in Theory and Practice - Self Shadow",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://blog.selfshadow.com/publications/s2015-shading-course/"
            }, {
               "date_added": "13101352890692939",
               "guid": "b0d10e76-3866-49bd-b2fc-c5762c493842",
               "id": "813",
               "name": "VBOs strangely slow? - Page 4",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.opengl.org/discussion_boards/showthread.php/170118-VBOs-strangely-slow?p=1197780#post1197780"
            }, {
               "date_added": "13109049446764622",
               "guid": "d5403543-bb76-4b24-be47-f7130b4962b8",
               "id": "818",
               "meta_info": {
                  "last_visited_desktop": "13164072270558193"
               },
               "name": "NVScene 2015 Session: How to Create Content with Signed Distance Functions (Johann Korndorfer) - YouTube",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.youtube.com/watch?v=s8nFqwOho-s"
            }, {
               "date_added": "13109049488387101",
               "guid": "68c34620-41a7-4524-9701-c299088425d7",
               "id": "819",
               "meta_info": {
                  "last_visited_desktop": "13196213660690406"
               },
               "name": "Umbra Ignite 2015: Alex Evans / Media Molecule - YouTube",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.youtube.com/watch?v=-3Yu0TCqa3E"
            }, {
               "date_added": "13118122873977651",
               "guid": "c556c30e-c63e-4d7a-b5d9-fd08891b1291",
               "id": "840",
               "name": "On Generative Algorithms: Introduction · inconvergent",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://inconvergent.net/generative/"
            }, {
               "date_added": "13118972994798284",
               "guid": "1f500a8d-0023-4730-8a2f-988d609d53d1",
               "id": "843",
               "name": "What every coder should know about gamma",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://blog.johnnovak.net/2016/09/21/what-every-coder-should-know-about-gamma/"
            }, {
               "date_added": "13119591518382713",
               "guid": "f0baf6ef-536a-4f7e-a8bf-890f790e7bf6",
               "id": "845",
               "name": "The fat-fueled brain: unnatural or advantageous? - Scientific American Blog Network",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://blogs.scientificamerican.com/mind-guest-blog/the-fat-fueled-brain-unnatural-or-advantageous/"
            }, {
               "date_added": "13122267955168483",
               "guid": "643aada5-8100-449b-a5ab-472b7c860414",
               "id": "848",
               "name": "Consider the Alternatives:  Quake’s Hidden-Surface Removal",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.bluesnews.com/abrash/chap66.shtml"
            }, {
               "date_added": "13128379489883211",
               "guid": "6b2c1335-4f12-49d8-8576-ed8bbe70b167",
               "id": "887",
               "name": "TU Wien Rendering #1 - Introduction - YouTube",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.youtube.com/watch?v=pjc1QAI6zS0&index=1&list=PLujxSBD-JXgnGmsn7gEyN28P1DnRZG7qi"
            }, {
               "date_added": "13130803882435512",
               "guid": "67a40d20-3c8a-45b6-9685-3b2607bb8083",
               "id": "906",
               "name": "HOWTO: Ray Marching",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.shadertoy.com/view/XllGW4"
            }, {
               "date_added": "13137626219730232",
               "guid": "1130269f-2c7b-47ac-a926-b32879816e88",
               "id": "942",
               "meta_info": {
                  "last_visited_desktop": "13137626219731662"
               },
               "name": "A Primer on Bézier Curves",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://pomax.github.io/bezierinfo/#preface"
            }, {
               "date_added": "13139962510484565",
               "guid": "d056ab54-0da5-402f-9e9f-f5254f2c6fef",
               "id": "951",
               "meta_info": {
                  "last_visited_desktop": "13139962510501386"
               },
               "name": "Modeling Real-World Terrain with Exponentially Distributed Noise (JCGT)",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://jcgt.org/published/0004/02/01/"
            }, {
               "date_added": "13146879007051521",
               "guid": "35ba24f8-09b7-4759-80b4-2af4f377773f",
               "id": "985",
               "meta_info": {
                  "last_visited_desktop": "13146879007055348"
               },
               "name": "Less Weird Quaternions | Probably Dance",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://probablydance.com/2017/08/05/intuitive-quaternions/"
            }, {
               "date_added": "13152742202149266",
               "guid": "0c59a804-e84c-4c9d-a778-abecc216dba3",
               "id": "1013",
               "meta_info": {
                  "last_visited_desktop": "13152742202171108"
               },
               "name": "Metaballs and Marching Squares",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://jamie-wong.com/2014/08/19/metaballs-and-marching-squares/"
            }, {
               "date_added": "13171063826280205",
               "guid": "d130088c-4648-45df-b81e-2e570897e6d3",
               "id": "1091",
               "meta_info": {
                  "last_visited_desktop": "13176634730222760"
               },
               "name": "Dual Quaternion Shader Explained Line by Line",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.chinedufn.com/dual-quaternion-shader-explained/"
            }, {
               "date_added": "13172631904932922",
               "guid": "a39d10f9-6f4f-40e4-aa74-9eed389fa1e3",
               "id": "1097",
               "meta_info": {
                  "last_visited_desktop": "13172631904998635"
               },
               "name": "Working with Simplex Noise",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://cmaher.github.io/posts/working-with-simplex-noise/"
            }, {
               "date_added": "13172900053163776",
               "guid": "6390eced-31f5-40aa-8eb0-0c0f756abde5",
               "id": "1100",
               "meta_info": {
                  "last_visited_desktop": "13172900053170412"
               },
               "name": "Learn OpenGL, extensive tutorial resource for learning Modern OpenGL",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://learnopengl.com/"
            }, {
               "date_added": "13173063171124975",
               "guid": "5551799f-e874-4389-8f4d-eeb6d9f4b3ee",
               "id": "1102",
               "meta_info": {
                  "last_visited_desktop": "13173063171127514"
               },
               "name": "Hugues Hoppe - Homepage",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://hhoppe.com/#demos"
            }, {
               "date_added": "13173069460355950",
               "guid": "674778f2-1eb5-41d7-aa9e-1f46fe4f063c",
               "id": "1103",
               "meta_info": {
                  "last_visited_desktop": "13173069460358888"
               },
               "name": "MAVERICK Publications",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://maverick.inria.fr/Publications/"
            }, {
               "date_added": "13173936488532784",
               "guid": "613f1229-11e1-4c43-ac31-8c795a7c407f",
               "id": "1113",
               "meta_info": {
                  "last_visited_desktop": "13173936488537935"
               },
               "name": "Geometric Tools: Source - Mathematics",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.geometrictools.com/Source/Mathematics.html"
            }, {
               "date_added": "13177136243424062",
               "guid": "4f5fcb3e-cc41-407d-b8b1-1cb9a7e439e3",
               "id": "1135",
               "meta_info": {
                  "last_visited_desktop": "13177136243432535"
               },
               "name": "Inigo Quilez :: domain warping",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.iquilezles.org/www/articles/warp/warp.htm"
            }, {
               "children": [ {
                  "children": [ {
                     "date_added": "13177817385722142",
                     "guid": "d2a779aa-9ea3-479f-91d2-575a7d4f1366",
                     "id": "1140",
                     "meta_info": {
                        "last_visited_desktop": "13177817385731888"
                     },
                     "name": "Filament engine theory overview",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "https://google.github.io/filament/Filament.md.html"
                  }, {
                     "date_added": "13177817792734229",
                     "guid": "353dd001-3e11-45d3-9a60-f035ad1fb831",
                     "id": "1143",
                     "meta_info": {
                        "last_visited_desktop": "13177817792738255"
                     },
                     "name": "LearnOpenGL - PBR Theory",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "https://learnopengl.com/PBR/Theory"
                  }, {
                     "date_added": "13177817977339939",
                     "guid": "30d58cca-3292-4482-ab22-634df67dcac9",
                     "id": "1144",
                     "meta_info": {
                        "last_visited_desktop": "13177817977342973"
                     },
                     "name": "PBR physics, math notes.pdf",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "http://blog.selfshadow.com/publications/s2013-shading-course/hoffman/s2013_pbs_physics_math_notes.pdf"
                  }, {
                     "date_added": "13184184010615813",
                     "guid": "e90efb0d-5492-44eb-8641-f11f6be44386",
                     "id": "1213",
                     "meta_info": {
                        "last_visited_desktop": "13184184010619608"
                     },
                     "name": "Physically Based Rendering: From Theory to Implementation",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "http://www.pbr-book.org/"
                  }, {
                     "date_added": "13184185620733078",
                     "guid": "50644968-a7ae-43e0-a97a-e7e6c916ca5a",
                     "id": "1214",
                     "meta_info": {
                        "last_visited_desktop": "13184185620733991"
                     },
                     "name": "On Intelligence: How a New Understanding of the Brain Will Lead to the Creation of Truly Intelligent Machines Reprint, Jeff Hawkins, Sandra Blakeslee - Amazon.com",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "https://www.amazon.com/Intelligence-Understanding-Creation-Intelligent-Machines-ebook/dp/B003J4VE5Y?qid=1539711887&refinements=p_27%3AJeff+Hawkins&s=Books&sr=1-1&ref=sr_1_1"
                  }, {
                     "date_added": "13184185638196636",
                     "guid": "2986564d-2f56-4823-9c52-fc9fbfd8f1f7",
                     "id": "1215",
                     "meta_info": {
                        "last_visited_desktop": "13184185638197314"
                     },
                     "name": "On Intelligence: How a New Understanding of the Brain Will Lead to the Creation of Truly Intelligent Machines Reprint, Jeff Hawkins, Sandra Blakeslee - Amazon.com",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "https://www.amazon.com/Intelligence-Understanding-Creation-Intelligent-Machines-ebook/dp/B003J4VE5Y"
                  }, {
                     "date_added": "13196166202682401",
                     "guid": "8a303ffc-5488-45a7-9c01-56e135069ce2",
                     "id": "1352",
                     "meta_info": {
                        "last_visited_desktop": "13196166202683105"
                     },
                     "name": "Physically Based Rendering: From Theory to Implementation",
                     "sync_transaction_version": "1",
                     "type": "url",
                     "url": "http://www.pbr-book.org/3ed-2018/contents.html"
                  } ],
                  "date_added": "13177817431433601",
                  "date_modified": "13196166202682401",
                  "guid": "f6edf451-7430-4ee3-b499-25b5db536072",
                  "id": "1142",
                  "name": "PBR",
                  "sync_transaction_version": "1",
                  "type": "folder"
               }, {
                  "date_added": "13185666715939479",
                  "guid": "28148346-8f2a-4da1-a5ef-2e3d7cd01609",
                  "id": "1233",
                  "meta_info": {
                     "last_visited_desktop": "13201492647274445"
                  },
                  "name": "Let’s remove Quaternions from every 3D Engine (An Interactive Introduction to Rotors from Geometric Algebra)",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://marctenbosch.com/quaternions/"
               }, {
                  "date_added": "13220757532374916",
                  "guid": "ba40e9b5-4a9c-4c6d-9b7e-da08c35a3778",
                  "id": "1498",
                  "name": "Probability Theory for Physically Based Rendering – Jacco’s Blog",
                  "type": "url",
                  "url": "https://jacco.ompf2.com/2019/12/11/probability-theory-for-physically-based-rendering/"
               } ],
               "date_added": "13177817431431365",
               "date_modified": "13221880967439455",
               "guid": "da937a98-05b6-4831-8df3-2b84e339715c",
               "id": "1141",
               "name": "Theory",
               "sync_transaction_version": "1",
               "type": "folder"
            }, {
               "date_added": "13179416227710335",
               "guid": "cac794fa-e8fc-48b8-8ae0-64ad6568c82e",
               "id": "1155",
               "meta_info": {
                  "last_visited_desktop": "13179416227719984"
               },
               "name": "Introduction to compute shaders | Anteru's blog",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://anteru.net/blog/2018/intro-to-compute-shaders/"
            }, {
               "date_added": "13179972031656210",
               "guid": "7b19936b-c74e-4c6e-a2eb-6d6ebf917064",
               "id": "1173",
               "meta_info": {
                  "last_visited_desktop": "13179972031683203"
               },
               "name": "Volumetric Curves",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://mattdesl.svbtle.com/shaping-curves-with-parametric-equations"
            }, {
               "date_added": "13199172867698608",
               "guid": "71d5bb64-b3df-4a4a-bf4f-456511623fe5",
               "id": "1371",
               "meta_info": {
                  "last_visited_desktop": "13199172867720790"
               },
               "name": "Simple Raymarching Example Scene",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.shadertoy.com/view/wd2SR3"
            }, {
               "date_added": "13208907637108373",
               "guid": "894763ad-a907-4553-b5f0-5d9a41fd8232",
               "id": "1421",
               "name": "3D Projection",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://jsantell.com/3d-projection"
            }, {
               "date_added": "13209182669003358",
               "guid": "4951d42d-6818-4c56-a2c4-030af55e3e99",
               "id": "1424",
               "name": "BiVector.net",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://bivector.net/doc.html"
            }, {
               "date_added": "13209203169245609",
               "guid": "2f3c9ea0-573c-4e30-a332-8e687713cd0b",
               "id": "1425",
               "name": "three",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://news.ycombinator.com/item?id=20584311"
            } ],
            "date_added": "13044228816020125",
            "date_modified": "13211631047111032",
            "guid": "ddac5066-d103-41ca-bf96-4cc779641a4a",
            "id": "85",
            "name": "Graphics Stuff",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13183618867739174",
               "guid": "e1050a00-8a30-4520-8ab0-5b23003f6492",
               "id": "1208",
               "meta_info": {
                  "last_visited_desktop": "13183618867739997"
               },
               "name": "Notes on Notation",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/hypotext/notation"
            }, {
               "date_added": "13184190032283630",
               "guid": "a0b8d4ec-c4f5-47c9-aa29-1995ca770fe6",
               "id": "1217",
               "meta_info": {
                  "last_visited_desktop": "13187250630085091"
               },
               "name": "Legible Mathematics — Sketches of an interactive arithmetic for programming by Glen Chiacchieri",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://glench.com/LegibleMathematics/"
            } ],
            "date_added": "13183618898940174",
            "date_modified": "13188992747582549",
            "guid": "9e521bb3-8c8e-4592-8abe-7789b892dabf",
            "id": "1209",
            "name": "Philosophy of notation",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "12976187851968370",
               "guid": "6f0a5713-1065-43dc-a03a-f5b5a84af119",
               "id": "1650",
               "name": "Amazon.com: Logic and Design, Revised: In Art, Science, and Mathematics (9781592288496): Krome Barratt: Books",
               "type": "url",
               "url": "http://www.amazon.com/dp/1592288499"
            }, {
               "date_added": "12976188281136571",
               "guid": "6405547c-5be9-43cf-9cd8-4e0e511db51e",
               "id": "393",
               "meta_info": {
                  "last_visited_desktop": "13187837935034408"
               },
               "name": "Amazon.com: Nonlinear Dynamics And Chaos: With Applications To Physics, Biology, Chemistry, And Engineering (Studies in Nonlinearity) (9780738204536): Steven H. Strogatz: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/dp/0738204536"
            }, {
               "date_added": "12976786405275978",
               "guid": "ff065461-6c44-40dc-8099-517cc582abdd",
               "id": "1564",
               "name": "Amazon.com: Mathematics and Its History (Undergraduate Texts in Mathematics) (9781441960528): John Stillwell: Books",
               "type": "url",
               "url": "http://www.amazon.com/Mathematics-Its-History-Undergraduate-Texts/dp/144196052X/ref=sr_1_1?s=books&ie=UTF8&qid=1332312306&sr=1-1"
            }, {
               "date_added": "12976786843344143",
               "guid": "4b48c2f6-bd46-4e05-9e07-b5a975fba783",
               "id": "1576",
               "name": "Amazon.com: Differential and Integral Calculus, Vol. One (9784871878388): Richard Courant, Edward James McShane, Sam Sloan, Marvin Jay Greenberg: Books",
               "type": "url",
               "url": "http://www.amazon.com/Differential-Integral-Calculus-Vol-One/dp/4871878384/ref=ntt_at_ep_dpt_2"
            }, {
               "date_added": "12976936802868658",
               "guid": "e0cd1e31-16ba-420c-b77d-17cdef7ff349",
               "id": "1561",
               "name": "Amazon.com: An Introduction to the Theory of Numbers (9780199219865): G. H. Hardy, Edward M. Wright, Andrew Wiles, Roger Heath-Brown, Joseph Silverman: Books",
               "type": "url",
               "url": "http://www.amazon.com/An-Introduction-Theory-Numbers-Hardy/dp/0199219869/ref=pd_sim_b_1"
            }, {
               "date_added": "12977573435753049",
               "guid": "d8bbc476-5b1b-4bbc-9dd7-96ba0063da09",
               "id": "1644",
               "name": "Amazon.com: Complex Variables (Dover Books on Mathematics) (9780486613888): Francis J. Flanigan: Books",
               "type": "url",
               "url": "http://www.amazon.com/Complex-Variables-Dover-Books-Mathematics/dp/0486613887/ref=sr_1_1?s=books&ie=UTF8&qid=1333099392&sr=1-1"
            }, {
               "date_added": "12977574420796005",
               "guid": "3ecd7dc2-6b73-454d-9129-da892c32585e",
               "id": "1635",
               "name": "Amazon.com: Yet Another Introduction to Analysis (9780521388351): Victor Bryant: Books",
               "type": "url",
               "url": "http://www.amazon.com/dp/052138835X/ref=rdr_ext_tmb"
            }, {
               "date_added": "12977574731969316",
               "guid": "2bb90c69-0c5e-450c-8288-8e70a81354e5",
               "id": "1659",
               "name": "Amazon.com: Aspects of Combinatorics: A Wide-ranging Introduction (9780521429979): Victor Bryant: Books",
               "type": "url",
               "url": "http://www.amazon.com/Aspects-Combinatorics-A-Wide-ranging-Introduction/dp/0521429978/ref=ntt_at_ep_dpt_3"
            }, {
               "date_added": "12978760572140102",
               "guid": "ed540a7d-5343-4608-afa1-64ff3e8f1e7a",
               "id": "1637",
               "name": "Amazon.com: Data Visualization (9781568813066): Alexandru C. Telea: Books",
               "type": "url",
               "url": "http://www.amazon.com/Data-Visualization-Alexandru-C-Telea/dp/1568813066/ref=sr_1_1?ie=UTF8&qid=1334286861&sr=8-1"
            }, {
               "date_added": "12978761764614100",
               "guid": "a3afc95c-0ae6-4262-9890-593df22ebfd5",
               "id": "1657",
               "name": "Amazon.com: 3D Computer Graphics (3rd Edition) (9780201398557): Alan Watt: Books",
               "type": "url",
               "url": "http://www.amazon.com/3D-Computer-Graphics-3rd-Edition/dp/0201398559/ref=sr_1_1?ie=UTF8&qid=1334287855&sr=8-1"
            }, {
               "date_added": "12978780898675333",
               "guid": "61938f18-3665-4fd7-aca7-b2cc9141b57e",
               "id": "1553",
               "name": "Amazon.com: A Vector Space Approach to Geometry (Dover Books on Mathematics) (9780486404523): Melvin Hausner, Mathematics: Books",
               "type": "url",
               "url": "http://www.amazon.com/Vector-Space-Approach-Geometry-Mathematics/dp/0486404528/ref=sr_1_8?ie=UTF8&qid=1334306995&sr=8-8"
            }, {
               "date_added": "12981001628140201",
               "guid": "d151115e-2522-4864-b468-f8a5a3a7bdcd",
               "id": "1560",
               "name": "A Course of Modern Analysis: E. T. Whittaker, G. N. Watson: 9781603861212: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/1603861211?ie=UTF8&tag=theende-20&linkCode=xm2&camp=1789&creativeASIN=1603861211"
            }, {
               "date_added": "12981001924054052",
               "guid": "50573923-8b53-499a-af48-ff10a830a77b",
               "id": "1602",
               "name": "Amazon.com: An Introduction to Probability Theory and Its Applications, Vol. 1, 3rd Edition (9780471257080): William Feller: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/0471257087?ie=UTF8&tag=theende-20&linkCode=xm2&camp=1789&creativeASIN=0471257087"
            }, {
               "date_added": "12981002167899836",
               "guid": "113ee843-a834-4db7-9bbb-489b55d71577",
               "id": "1614",
               "name": "The Linux Command Line: A Complete Introduction: William E. Shotts Jr.: 9781593273897: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/1593273894/ref=as_li_ss_il?ie=UTF8&tag=theende-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1593273894"
            }, {
               "date_added": "12981003544479550",
               "guid": "ae724604-2e34-452a-ac6e-0e1acdf52241",
               "id": "1646",
               "name": "Amazon.com: The Divine Comedy, Part 1: Hell (Penguin Classics) (9780140440065): Dante Alighieri, Dorothy L. Sayers: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/0140440062?ie=UTF8&tag=theende-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0140440062"
            }, {
               "date_added": "12981006855022842",
               "guid": "747936cc-4962-4d76-a1ce-d7a78b47c5d8",
               "id": "1585",
               "name": "Amazon.com: Calculus, 4th edition (9780914098911): Michael Spivak: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/0914098918?ie=UTF8&tag=theende-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0914098918"
            }, {
               "date_added": "12981007296613407",
               "guid": "d28cefb9-647d-4ddd-9ff0-c8c60c5791a2",
               "id": "1641",
               "name": "Amazon.com: A Canticle for Leibowitz (9780060892999): Walter M. Miller Jr., Mary Doria Russell: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/0060892994?ie=UTF8&tag=theende-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0060892994"
            }, {
               "date_added": "12981007813672306",
               "guid": "757e6cf4-8dad-47d6-a3a1-e56a58640964",
               "id": "1654",
               "name": "Amazon.com: The History and Development of Nomography (9781456479626): Dr. H. A. Evesham, Brenda Riddell: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/1456479628/ref=as_li_ss_tl?ie=UTF8&tag=theende-20&linkCode=as2&camp=217145&creative=399373&creativeASIN=1456479628"
            }, {
               "date_added": "12981015522300681",
               "guid": "ff14010c-1768-4708-a78b-d75ab028cea8",
               "id": "1572",
               "name": "Amazon.com: The Cauchy-Schwarz Master Class: An Introduction to the Art of Mathematical Inequalities (Maa Problem Books Series.) (9780521546775): J. Michael Steele: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/052154677X?ie=UTF8&tag=theende-20&linkCode=xm2&camp=1789&creativeASIN=052154677X"
            }, {
               "date_added": "12981452729495176",
               "guid": "1a09b015-10ee-481d-86b7-a17508646279",
               "id": "1588",
               "name": "Amazon.com: The Book of Numbers (9780387979939): John H. Conway, Richard Guy: Books",
               "type": "url",
               "url": "http://www.amazon.com/The-Book-Numbers-John-Conway/dp/038797993X/ref=ntt_at_ep_dpt_3"
            }, {
               "date_added": "12981552875647018",
               "guid": "909d0262-7038-4715-8b39-5e20ce281c50",
               "id": "1662",
               "name": "Amazon.com: The Lifebox, the Seashell, and the Soul: What Gnarly Computation Taught Me About Ultimate Reality, the Meaning of Life, and How to Be Happy (9781560258988): Rudy Rucker: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/1560258985/ref=cm_cr_asin_lnk"
            }, {
               "date_added": "12981588026713002",
               "guid": "cdff94fe-f3ff-48f5-9d7f-642669648e1c",
               "id": "1548",
               "name": "Wool Omnibus Edition (Wool 1 - 5): Hugh Howey: Amazon.com: Kindle Store",
               "type": "url",
               "url": "http://www.amazon.com/Wool-Omnibus-Edition-ebook/dp/B0071XO8RA"
            }, {
               "date_added": "12982295844984555",
               "guid": "37df9297-4907-4c24-a860-7821cca4c66b",
               "id": "1568",
               "name": "Amazon.com: Calculus: An Intuitive and Physical Approach (Second Edition) (Dover Books on Mathematics) (9780486404530): Morris Kline: Books",
               "type": "url",
               "url": "http://www.amazon.com/Calculus-Intuitive-Physical-Approach-Mathematics/dp/0486404536/ref=pd_sim_b_6"
            }, {
               "date_added": "12982295875884774",
               "guid": "92399228-ab45-456d-a13b-8394844d8eb4",
               "id": "1618",
               "name": "Amazon.com: The Development of Mathematics (9780486272399): E. T. Bell: Books",
               "type": "url",
               "url": "http://www.amazon.com/Development-Mathematics-E-T-Bell/dp/0486272397/ref=sr_1_3?s=books&ie=UTF8&qid=1337822241&sr=1-3"
            }, {
               "date_added": "12976189624706153",
               "guid": "6933e5dc-921d-439b-bdd1-09d8c5b2dce6",
               "id": "1555",
               "name": "Amazon.com: Art of Doing Science and Engineering: Learning to Learn (9789056995003): Richard W. Hamming: Books",
               "type": "url",
               "url": "http://www.amazon.com/dp/9056995006"
            }, {
               "date_added": "12982369253739134",
               "guid": "213c65f5-b27e-4759-a608-0f01214fc3cb",
               "id": "1633",
               "name": "Amazon.com: Metric Spaces: Iteration and Application (9780521318976): Victor Bryant: Books",
               "type": "url",
               "url": "http://www.amazon.com/Metric-Spaces-Application-Victor-Bryant/dp/0521318971/ref=ntt_at_ep_dpt_3"
            }, {
               "date_added": "12982370214709169",
               "guid": "2a60377c-0d2a-476d-9bd3-4a68883e8c34",
               "id": "1660",
               "name": "Amazon.com: Calculus, Vol. 1: One-Variable Calculus, with an Introduction to Linear Algebra (9780471000051): Tom M. Apostol: Books",
               "type": "url",
               "url": "http://www.amazon.com/Calculus-Vol-One-Variable-Introduction-Algebra/dp/0471000051/ref=sr_1_1?ie=UTF8&qid=1337896286&sr=8-1"
            }, {
               "date_added": "12982370331852332",
               "guid": "46cc12bc-a3a5-4975-a947-eeaec158f890",
               "id": "1652",
               "name": "Amazon.com: (Spivak) Calculus, 4th edition (9780914098911): Michael Spivak: Books",
               "type": "url",
               "url": "http://www.amazon.com/Calculus-4th-Michael-Spivak/dp/0914098918/ref=ntt_at_ep_dpt_1"
            }, {
               "date_added": "12983334334035286",
               "guid": "a0814568-3d41-451c-8196-84cd4557411c",
               "id": "1638",
               "name": "Amazon.com: Elemental Design Patterns (9780321711922): Jason McC. Smith: Books",
               "type": "url",
               "url": "http://www.amazon.com/dp/0321711920/ref=nosim/?tag=slashdot0c-20"
            }, {
               "date_added": "12984234224036323",
               "guid": "673dc6a4-a17d-4c9f-a4c2-aa1ca7e2f85c",
               "id": "1600",
               "name": "Amazon.com: Hackers and Painters: Big Ideas from the Computer Age (9780596006624): Paul Graham: Books",
               "type": "url",
               "url": "http://www.amazon.com/exec/obidos/ASIN/0596006624/codihorr-20"
            }, {
               "date_added": "12985689989082753",
               "guid": "64138fbc-3ddc-4c9e-953b-7eeec9043fa1",
               "id": "1577",
               "name": "Amazon.com: Hyperspace: Michio Kaku: Books",
               "type": "url",
               "url": "http://www.amazon.com/Hyperspace-Michio-Kaku/dp/B001IC56GW/ref=sr_1_2?s=books&ie=UTF8&qid=1341216307&sr=1-2&keywords=hyperspace"
            }, {
               "date_added": "12986212696424743",
               "guid": "a4b24aa8-5a77-49cb-8a41-8c9ecb5adac8",
               "id": "1655",
               "name": "Amazon.com: How to Be Alone: Essays (9780312422165): Jonathan Franzen: Books",
               "type": "url",
               "url": "http://www.amazon.com/How-Be-Alone-Jonathan-Franzen/dp/0312422164/ref=la_B00458HQ7S_1_4?ie=UTF8&qid=1341738490&sr=1-4"
            }, {
               "date_added": "12986602568705904",
               "guid": "b304cf99-c11c-4173-9e72-d66cf22cb2c5",
               "id": "1620",
               "name": "Amazon.com: Readings in Information Visualization: Using Vision to Think (Interactive Technologies) (9781558605336): Stuart K. Card, Jock Mackinlay, Ben Shneiderman: Books",
               "type": "url",
               "url": "http://www.amazon.com/Readings-Information-Visualization-Interactive-Technologies/dp/1558605339/ref=sr_1_1?s=books&ie=UTF8&qid=1342128900&sr=1-1&keywords=readings+in+information+visualization+using+vision+to+think"
            }, {
               "date_added": "12986645582906029",
               "guid": "95754962-2309-40d8-87b2-ed9fce578fd6",
               "id": "1617",
               "name": "Amazon.com: Concrete Mathematics: A Foundation for Computer Science (2nd Edition) (0785342558029): Ronald L. Graham, Donald E. Knuth, Oren Patashnik: Books",
               "type": "url",
               "url": "http://www.amazon.com/Concrete-Mathematics-Foundation-Computer-Science/dp/0201558025/ref=la_B000AQ6O7M_1_2?ie=UTF8&qid=1342171777&sr=1-2"
            }, {
               "date_added": "12986646903925587",
               "guid": "ecea57a3-6882-46db-93dc-6e0087cc0583",
               "id": "1552",
               "name": "Amazon.com: The Algorithm Design Manual (9781849967204): Steven S. Skiena: Books",
               "type": "url",
               "url": "http://www.amazon.com/Algorithm-Design-Manual-Steven-Skiena/dp/1849967202/ref=sr_1_1?ie=UTF8&qid=1342173287&sr=8-1&keywords=the+algorithm+design+manual"
            }, {
               "date_added": "12987685948200448",
               "guid": "60943bce-8e62-4c46-9b97-18db825b66f4",
               "id": "1609",
               "name": "Amazon.com: Dreamland (P.S.) (9780060852726): Kevin Baker: Books",
               "type": "url",
               "url": "http://www.amazon.com/Dreamland-P-S-Kevin-Baker/dp/B002KE5UUY/ref=sr_1_1?ie=UTF8&qid=1343212203&sr=8-1&keywords=dreamland+baker"
            }, {
               "date_added": "12987847025066604",
               "guid": "758427e5-5d26-409b-9105-41a452ed6e0a",
               "id": "1640",
               "name": "Amazon.com: The Strategy and Tactics of Pricing: A Guide to Growing More Profitably (9780136106814): Thomas Nagle, John Hogan, Joseph Zale: Books",
               "type": "url",
               "url": "http://www.amazon.com/The-Strategy-Tactics-Pricing-Edition/dp/0136106811/ref=sr_1_1?ie=UTF8&qid=1335335362&sr=8-1"
            }, {
               "date_added": "12988320084228663",
               "guid": "2486fb66-1179-437a-afb4-73444fce3a9b",
               "id": "1613",
               "name": "Amazon.com: DSLs in Action (9781935182450): Debasish Ghosh: Books",
               "type": "url",
               "url": "http://www.amazon.com/DSLs-Action-Debasish-Ghosh/dp/1935182455/ref=sr_1_1?ie=UTF8&qid=1343846000&sr=8-1&keywords=dsls+in+action"
            }, {
               "date_added": "12988320978234797",
               "guid": "9940320a-896d-4e58-9ad3-594d2388252c",
               "id": "1628",
               "name": "Amazon.com: Language Implementation Patterns: Create Your Own Domain-Specific and General Programming Languages (Pragmatic Programmers) (9781934356456): Terence Parr: Books",
               "type": "url",
               "url": "http://www.amazon.com/Language-Implementation-Patterns-Domain-Specific-Programming/dp/193435645X/ref=pd_bxgy_b_text_c"
            }, {
               "date_added": "12988706828937975",
               "guid": "003f4731-37d3-477f-85b7-693030e9a84e",
               "id": "1651",
               "name": "Welcome ! | The Coq Proof Assistant",
               "type": "url",
               "url": "http://coq.inria.fr/"
            }, {
               "date_added": "12988712391280123",
               "guid": "9e757d2e-059c-4ae9-ab4d-8223b17e66ef",
               "id": "1611",
               "name": "Amazon.com: Managing Humans: Biting and Humorous Tales of a Software Engineering Manager (9781430243144): Michael Lopp: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/1430243147/ref=as_li_ss_tl?ie=UTF8&tag=beigee-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1430243147"
            }, {
               "date_added": "12988794162324470",
               "guid": "d486315a-bd7c-4b87-a2fe-adb467dba827",
               "id": "434",
               "name": "Existential Type (awesome PLs-book guy)",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://existentialtype.wordpress.com/"
            }, {
               "date_added": "12988842630506327",
               "guid": "41433d13-4a7b-4775-9c91-c19528844928",
               "id": "1579",
               "name": "Amazon.com: To Mock a Mockingbird (9780192801425): Raymond Smullyan: Books",
               "type": "url",
               "url": "http://www.amazon.com/To-Mock-Mockingbird-Raymond-Smullyan/dp/0192801422/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "12989632998057692",
               "guid": "03fbc1c7-cc69-4fd8-88d7-ed085e01a531",
               "id": "1623",
               "name": "Amazon.com: Programming in Haskell (9780521692694): Professor Graham Hutton: Books",
               "type": "url",
               "url": "http://www.amazon.com/Programming-Haskell-Professor-Graham-Hutton/dp/0521692695/ref=sr_1_1?ie=UTF8&qid=1345159092&sr=8-1&keywords=programming+in+haskell"
            }, {
               "date_added": "13057014348807625",
               "guid": "ef92be70-cba6-4e47-a174-58519bd3e645",
               "id": "1583",
               "name": "defmacro - Functional Programming For The Rest of Us",
               "type": "url",
               "url": "http://www.defmacro.org/ramblings/fp.html"
            }, {
               "date_added": "13057014348807717",
               "guid": "f1dedc3e-72eb-4f3b-95f0-ac53d5d1a12b",
               "id": "1626",
               "name": "Hoare lecture",
               "type": "url",
               "url": "http://zoo.cs.yale.edu/classes/cs422/2011/bib/hoare81emperor.pdf"
            }, {
               "date_added": "13057014348807791",
               "guid": "dc58e900-7d73-4447-bbe9-d78e1adc8dc7",
               "id": "1554",
               "name": "zoo.cs.yale.edu/classes/cs422/2011/bib/hoare81emperor.pdf",
               "type": "url",
               "url": "http://zoo.cs.yale.edu/classes/cs422/2011/bib/hoare81emperor.pdf"
            }, {
               "date_added": "12991199855105315",
               "guid": "650e2e04-5050-4f0f-9fc7-0760ccf30af6",
               "id": "1550",
               "name": "Math for Game Programmers 05 – Vector Cheat Sheet | Higher-Order Fun",
               "type": "url",
               "url": "http://higherorderfun.com/blog/2012/06/03/math-for-game-programmers-05-vector-cheat-sheet/"
            }, {
               "date_added": "12991200396466731",
               "guid": "539fe646-b4a6-4ac8-ad59-99fab801c8b6",
               "id": "1549",
               "name": "Amazon.com: Shakespeare's Words: A Glossary and Language Companion (9780140291179): David Crystal, Ben Crystal, Stanley Wells: Books",
               "type": "url",
               "url": "http://www.amazon.com/Shakespeares-Words-Glossary-Language-Companion/dp/0140291172/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "12991200560035075",
               "guid": "91262311-4a6f-4ef9-b79d-3eef0f1c4834",
               "id": "1578",
               "name": "Think On My Words: Exploring Shakespeare's Language: David Crystal: 9780521700351: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Think-On-Words-Exploring-Shakespeares/dp/0521700353/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "12991200682976106",
               "guid": "a6b7b443-8686-43d5-b79d-3cdb5a653427",
               "id": "1551",
               "name": "The English Language: A Guided Tour of the Language: David Crystal: 9780141003962: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/The-English-Language-Guided-Tour/dp/0141003960/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "13057014348808357",
               "guid": "6c4a7a7a-3fb1-44bc-aa9c-1c32aabe883f",
               "id": "444",
               "name": "Hackety Hack!",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://hackety.com/"
            }, {
               "date_added": "12991478240842081",
               "guid": "acf23eef-3d33-4d94-830e-d7552a43e5e9",
               "id": "1631",
               "name": "Features » The SOUL program query language",
               "type": "url",
               "url": "http://soft.vub.ac.be/SOUL/features-of-soul/motivating-example-pattern-detection/"
            }, {
               "date_added": "12993294714708669",
               "guid": "5766fbf8-b87f-464e-890a-a5efa8d6bef5",
               "id": "1566",
               "name": "Stormy weather - Page 2 - News - Dallas - Dallas Observer",
               "type": "url",
               "url": "http://www.dallasobserver.com/1999-01-14/news/stormy-weather/2/"
            }, {
               "date_added": "12993294808549036",
               "guid": "07f0a7b4-fd96-4a86-a6fd-c4313737fe78",
               "id": "1661",
               "name": "Learnable Programming",
               "type": "url",
               "url": "http://worrydream.com/LearnableProgramming/"
            }, {
               "date_added": "12993295654780438",
               "guid": "5d99ff6e-3653-4d4d-b702-40b994497b39",
               "id": "1563",
               "name": "The Nature of Computation (Christopher Moore, Stephan Mertens)",
               "type": "url",
               "url": "http://dannyreviews.com/h/Nature_Computation.html"
            }, {
               "date_added": "12993980878748917",
               "guid": "9f241348-d60c-46d8-9f6a-388358207dcc",
               "id": "1545",
               "name": "The Case Against Logic-less Templates — eBay Tech Blog",
               "type": "url",
               "url": "http://www.ebaytechblog.com/2012/10/01/the-case-against-logic-less-templates/"
            }, {
               "date_added": "12994150368146982",
               "guid": "366d8d91-ea09-4c90-9694-69e5b8be3bc2",
               "id": "1590",
               "name": "Math ∩ Programming | A place for elegant solutions",
               "type": "url",
               "url": "http://jeremykun.wordpress.com/"
            }, {
               "date_added": "12994939143608441",
               "guid": "229b8120-5206-4960-985b-58f1527e225e",
               "id": "1643",
               "name": "The Structure and Interpretation of Quantum Mechanics: R.I.G. Hughes: 9780674843929: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/0674843924/ref=cm_cr_asin_lnk"
            }, {
               "date_added": "12994939302504529",
               "guid": "f355a8a0-6795-4bc9-a381-1a2c098d9612",
               "id": "1569",
               "name": "Mathematical Foundations of Quantum Mechanics: John von Neumann: 9780691028934: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Mathematical-Foundations-Quantum-Mechanics-Neumann/dp/0691028931/ref=sr_1_1?s=books&ie=UTF8&qid=1350464950&sr=1-1&keywords=mathematical+foundations+of+quantum+mechanics"
            }, {
               "date_added": "12994984126256340",
               "guid": "16a5c0d1-1c12-4135-ae81-56d49db88712",
               "id": "1653",
               "name": "The Cyberiad: Stanislaw Lem: 9780156027595: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Cyberiad-Stanislaw-Lem/dp/0156027593/ref=sr_1_1?s=books&ie=UTF8&qid=1350509651&sr=1-1&keywords=the+cyberiad"
            }, {
               "date_added": "12995010065083138",
               "guid": "15a1af43-a4de-478b-a3d0-bb9cb1d3b81b",
               "id": "1658",
               "name": "The Nature of Computation: Cristopher Moore,Stephan Mertens: 9780199233212: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/The-Nature-Computation-Cristopher-Moore/dp/0199233217/ref=sr_1_1?ie=UTF8&qid=1350536274&sr=8-1&keywords=the+nature+of+computation"
            }, {
               "date_added": "12995100331779097",
               "guid": "442bd1c8-908f-4535-9777-a1f27d6d51ae",
               "id": "1559",
               "name": "Devil Take the Hindmost: A History of Financial Speculation: Edward Chancellor: 9780452281806: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Devil-Take-Hindmost-Financial-Speculation/dp/0452281806/ref=sr_1_1?s=books&ie=UTF8&qid=1324718481&sr=1-1"
            }, {
               "date_added": "12995365849603230",
               "guid": "b7a37214-6dea-4062-bb71-d94f7f32bf51",
               "id": "1595",
               "name": "Eddington's Search for a Fundamental Theory: A Key to the Universe: C. W. Kilmister: 9780521017282: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Eddingtons-Search-Fundamental-Theory-Universe/dp/0521017289/ref=sr_1_1?ie=UTF8&qid=1350892230&sr=8-1&keywords=fundamental+theory+eddington"
            }, {
               "date_added": "12996140050211321",
               "guid": "98251058-5f28-45e2-87a1-e505adb9d538",
               "id": "1608",
               "name": "Mathematical Ideas in Biology: J. Maynard Smith: 9780521095501: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Mathematical-Ideas-Biology-Maynard-Smith/dp/0521095506/ref=sr_1_1?ie=UTF8&qid=1351666366&sr=8-1&keywords=mathematical+ideas+in+biology"
            }, {
               "date_added": "12996142728898533",
               "guid": "602c6ae6-80a8-443a-bf2d-b5ef04f06eca",
               "id": "1625",
               "name": "The Craft of Prolog (Logic Programming): Richard O'Keefe: 9780262512275: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/The-Craft-Prolog-Logic-Programming/dp/0262512270/ref=cm_cr-mr-title"
            }, {
               "date_added": "12996142913879113",
               "guid": "f71eaa20-cb67-4c59-a19c-6d01cf3b4fbf",
               "id": "1647",
               "name": "Information Theory, Inference and Learning Algorithms: David J. C. MacKay: 9780521642989: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Information-Theory-Inference-Learning-Algorithms/dp/0521642981/ref=cm_cr-mr-title"
            }, {
               "date_added": "12996142989832457",
               "guid": "f56501e5-1134-4a4f-b7f1-a32937daba97",
               "id": "1565",
               "name": "The Pleasures of Counting: T. W. Körner: 9780521568234: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/The-Pleasures-Counting-246-rner/dp/0521568234/ref=cm_cr-mr-title"
            }, {
               "date_added": "12996214797012549",
               "guid": "8aa2e66c-41b5-4ebe-a7f0-ad4495d97832",
               "id": "1547",
               "name": "A Survey of Modern Algebra (Akp Classics): Garrett Birkhoff, Saunders Mac Lane: 9781568810683: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Survey-Modern-Algebra-Akp-Classics/dp/1568810687/ref=sr_1_2?ie=UTF8&qid=1351740942&sr=8-2&keywords=birkhoff-maclane"
            }, {
               "date_added": "12996740618640398",
               "guid": "12e29e70-23cb-4e8c-9083-3595b22040fe",
               "id": "1567",
               "name": "The Science of Mechanics: A Critical and Historical Account of Its Development: Ernst Mach, T. J. McCormack, Karl Menger: 9780875482026: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/The-Science-Mechanics-Historical-Development/dp/0875482023/ref=sr_1_2?ie=UTF8&qid=1352266762&sr=8-2&keywords=ernst+mach+mechanics"
            }, {
               "date_added": "12997035918144498",
               "guid": "2e237d41-6799-4174-9e61-b952c006b342",
               "id": "1592",
               "name": "Amazon.com: Customer Reviews: Mathematics: Its Content, Methods and Meaning (Dover Books on Mathematics)",
               "type": "url",
               "url": "http://www.amazon.com/Mathematics-Content-Methods-Meaning-Dover/product-reviews/0486409163/ref=sr_1_1_cm_cr_acr_txt?ie=UTF8&showViewpoints=1"
            }, {
               "date_added": "12997155472473110",
               "guid": "f8728d8e-d87c-4413-8dc8-8f9bc0ed3875",
               "id": "1648",
               "name": "I Want to Be a Mathematician: An Automathography in Three Parts (Maa Spectrum Series): Paul R. Halmos: 9780883854457: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Want-Be-Mathematician-Automathography-Spectrum/dp/0883854457/ref=sr_1_2?s=books&ie=UTF8&qid=1352675716&sr=1-2&keywords=i+want+to+be+a+mathematician"
            }, {
               "date_added": "12997169264110360",
               "guid": "8aab86f4-13ab-4c87-b556-2c1a732b88ae",
               "id": "1556",
               "name": "Rediscovering Mathematics: Shai Simonson: 9780883857809: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Rediscovering-Mathematics-Shai-Simonson/dp/0883857804/ref=tmm_pap_title_0"
            }, {
               "date_added": "12997958058817288",
               "guid": "36d089bc-7400-470f-8725-cafe1ee21131",
               "id": "1636",
               "name": "Introduction to Geometry (Wiley Classics Library): H. S. M. Coxeter: 9780471504580: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Introduction-Geometry-Wiley-Classics-Library/dp/0471504580/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "13057014348810929",
               "guid": "c4f95b02-f6ca-4264-be40-14fa3869e7a0",
               "id": "467",
               "name": "Kestrels, Quirky Birds, and Hopeless Egocentricity",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://combinators.info/"
            }, {
               "date_added": "12998562918469012",
               "guid": "c2bcf69c-98f3-49c1-9546-5d51c18e9357",
               "id": "1639",
               "name": "Circles Disturbed: The Interplay of Mathematics and Narrative: Apostolos Doxiadis, Barry Mazur: 9780691149042: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Circles-Disturbed-Interplay-Mathematics-Narrative/dp/0691149046/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "12998568991668815",
               "guid": "745268cf-58dc-489b-81be-6076d79b4507",
               "id": "1587",
               "name": "Infinity and the Mind: The Science and Philosophy of the Infinite (Princeton Science Library): Rudy Rucker: 9780691121277: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Infinity-Mind-Philosophy-Infinite-Princeton/dp/0691121273/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "12998569585183234",
               "guid": "78b84b4a-8006-418b-b33a-59f78b9a1c86",
               "id": "1582",
               "name": "Measurement: Paul Lockhart: 9780674057555: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Measurement-Paul-Lockhart/dp/0674057554/ref=pd_rhf_cr_s_cp_1"
            }, {
               "date_added": "12998578172364678",
               "guid": "10d8bdf8-a767-4229-b290-598a596386d5",
               "id": "1597",
               "name": "Against Method (Fourth Edition): Paul Feyerabend, Ian Hacking: 9781844674428: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/1844674428/ref=cm_cr_asin_lnk"
            }, {
               "date_added": "12998578239627158",
               "guid": "9223dffe-52a9-422d-b1b0-025f17e1b822",
               "id": "1575",
               "name": "Amazon.com: The Design of Business: Why Design Thinking is the Next Competitive Advantage (9781422177808): Roger L. Martin: Books",
               "type": "url",
               "url": "http://www.amazon.com/The-Design-Business-Competitive-Advantage/dp/1422177807/ref=cm_cr-mr-title"
            }, {
               "date_added": "12998578803957249",
               "guid": "cf1d9384-be30-4fef-a4c4-01aefd1043c8",
               "id": "1558",
               "name": "On The Shoulders Of Giants: Nicolaus Copernicus, Johannes Kepler, Galileo Galalei, Isaac Newton, Albert Einstein, Stephen Hawking: 9780762416981: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/On-The-Shoulders-Of-Giants/dp/076241698X/ref=sr_1_15?ie=UTF8&qid=1354104747&sr=8-15&keywords=stephen+hawking"
            }, {
               "date_added": "12998641320609367",
               "guid": "814ee9e0-6684-4259-8150-7f5120d7d574",
               "id": "1562",
               "name": "The Origin of Consciousness in the Breakdown of the Bicameral Mind: Julian Jaynes: 9780618057078: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Origin-Consciousness-Breakdown-Bicameral-Mind/dp/0618057072/ref=cm_cr-mr-title"
            }, {
               "date_added": "12998641504740389",
               "guid": "9fc25c10-ef81-42d1-a503-fbf5092185aa",
               "id": "1581",
               "name": "Nietzsche: The Man and his Philosophy (Biography): R. J. Hollingdale: 9780521002950: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Nietzsche-The-Man-Philosophy-Biography/dp/0521002958/ref=cm_cr-mr-title"
            }, {
               "date_added": "12998642649108279",
               "guid": "fb3fc07c-ed06-4a74-b029-07d7b73e9acb",
               "id": "1591",
               "name": "Wittgenstein (Open Court Paperbacks): III Bartley: 9780875484419: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Wittgenstein-Open-Court-Paperbacks-Bartley/dp/0875484417/ref=cm_cr-mr-title"
            }, {
               "date_added": "12999126209794472",
               "guid": "24b9110c-f83d-4ca1-b1c8-cfe759621d80",
               "id": "1584",
               "name": "The E-Myth Revisited: Why Most Small Businesses Don't Work and What to Do About It: Michael E. Gerber: 9780887307287: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/The-E-Myth-Revisited-Small-Businesses/dp/0887307280"
            }, {
               "date_added": "12999126595201005",
               "guid": "6ba94ff9-9f63-40df-8bfb-bef0ff6ada00",
               "id": "1607",
               "name": "The Personal MBA: Master the Art of Business: Josh Kaufman: 9781591843528: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/The-Personal-MBA-Master-Business/dp/1591843529"
            }, {
               "date_added": "13057014348812311",
               "guid": "328616a7-ca12-4725-b098-df6e92a0f034",
               "id": "479",
               "name": "The Nature of Code",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://natureofcode.com/book/"
            }, {
               "date_added": "13000263927962456",
               "guid": "f0eee6af-b268-4f68-ab51-71b11313aa76",
               "id": "1615",
               "name": "Nexus: Ramez Naam: 9780857662934: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Nexus-Ramez-Naam/dp/0857662937/ref=sr_1_1?s=books&ie=UTF8&qid=1355790288&sr=1-1&keywords=nexus"
            }, {
               "date_added": "13000265947188149",
               "guid": "abd57a38-9484-48ce-8f72-6a41d13fe1de",
               "id": "1544",
               "name": "Nonzero: The Logic of Human Destiny: Robert Wright: 9780679758945: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Nonzero-Logic-Destiny-Robert-Wright/dp/0679758941/ref=sr_1_1?s=books&ie=UTF8&qid=1355791620&sr=1-1&keywords=non-zero"
            }, {
               "date_added": "13000365749073667",
               "guid": "5e06286e-7f35-46b0-a06a-c9db95602ea9",
               "id": "1605",
               "name": "The Death of Economics: Paul Ormerod: 9780471180005: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/The-Death-Economics-Paul-Ormerod/dp/0471180009/ref=sr_1_1?ie=UTF8&qid=1355890825&sr=8-1&keywords=death+of+economics"
            }, {
               "date_added": "13001064271460950",
               "guid": "28c39e69-629f-4236-9f3e-f474bc6c8ef1",
               "id": "1604",
               "name": "Amazon.com: Smalltalk Best Practice Patterns (9780134769042): Kent Beck: Books",
               "type": "url",
               "url": "http://www.amazon.com/Smalltalk-Best-Practice-Patterns-Kent/dp/013476904X"
            }, {
               "date_added": "13007341837579670",
               "guid": "1ce96974-578b-4e59-9cd3-b04f622f8efa",
               "id": "1571",
               "name": "Amazon.com: Customer Reviews: Undergraduate Algebra (Undergraduate Texts in Mathematics)",
               "type": "url",
               "url": "http://www.amazon.com/Undergraduate-Algebra-Texts-Mathematics/product-reviews/1441919597/ref=dp_top_cm_cr_acr_txt?ie=UTF8&showViewpoints=1"
            }, {
               "date_added": "13013475988602756",
               "guid": "dd4695fc-9be7-4c77-9acd-5ffc5f92bd18",
               "id": "1656",
               "name": "The Symbolic Species: The Co-evolution of Language and the Brain: Terrence W. Deacon: 9780393317541: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/The-Symbolic-Species-Co-evolution-Language/dp/0393317544/ref=sr_1_1?ie=UTF8&qid=1369002141&sr=8-1&keywords=the+symbolic+species"
            }, {
               "date_added": "13014066503263230",
               "guid": "54ef99ae-1873-42d2-b99f-60f04370f836",
               "id": "1593",
               "name": "The Haskell Road to Logic, Maths and Programming",
               "type": "url",
               "url": "http://homepages.cwi.nl/~jve/HR/"
            }, {
               "date_added": "13014066617117797",
               "guid": "a7204ac5-57a6-4492-89b1-0f1d5b8185dc",
               "id": "1573",
               "meta_info": {
                  "last_visited_desktop": "13162766438553390"
               },
               "name": "Real World Haskell",
               "type": "url",
               "url": "http://book.realworldhaskell.org/"
            }, {
               "date_added": "13014117424034099",
               "guid": "c032bd29-0987-4be1-9454-53fc844e1ea3",
               "id": "1610",
               "name": "Principles of Quantum Mechanics, 2nd Edition: R. Shankar: 9780306447907: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/0306447908/ref=cm_cr_asin_lnk"
            }, {
               "date_added": "13014150977347523",
               "guid": "49cdc167-02fa-4552-94e6-2eec169c9668",
               "id": "489",
               "name": "Programming in Haskell",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.cs.nott.ac.uk/~gmh/book.html"
            }, {
               "date_added": "13015241034723571",
               "guid": "9860b03e-a0ed-42b7-a649-295dfc8bda4f",
               "id": "1621",
               "name": "Amazon.com: Causality eBook: Judea Pearl: Kindle Store",
               "type": "url",
               "url": "http://www.amazon.com/Causality-ebook/dp/B00AKE1VYK/ref=sr_1_11?ie=UTF8&qid=1370766777&sr=8-11&keywords=nonmonotonic+reasoning"
            }, {
               "date_added": "13015241047224584",
               "guid": "a1c76a5e-1058-490f-b8be-0c135654723b",
               "id": "1589",
               "name": "Amazon.com: Nonmonotonic Reasoning (Artificial Intelligence Series): Grigoris Antoniou: Books",
               "type": "url",
               "url": "http://www.amazon.com/Nonmonotonic-Reasoning-Artificial-Intelligence-Series/dp/B001PGXLRW/ref=sr_1_1?ie=UTF8&qid=1370766777&sr=8-1&keywords=nonmonotonic+reasoning"
            }, {
               "date_added": "13015241156941982",
               "guid": "5a1045e9-5ea7-455d-87cb-5fbd2200d2dc",
               "id": "1624",
               "name": "Set Theory and Its Philosophy: A Critical Introduction: Michael Potter: 9780199270415: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Set-Theory-Its-Philosophy-Introduction/dp/0199270414/ref=cm_cr-mr-title"
            }, {
               "date_added": "13015241546681509",
               "guid": "57166efa-d525-4a10-9849-6e7ab671d3a6",
               "id": "1645",
               "name": "Amazon.com: Anti-Oedipus: Capitalism and Schizophrenia (Penguin Classics) (9780143105824): Gilles Deleuze, Felix Guattari, Robert Hurley, Mark Seem, Helen Lane, Michel Foucault: Books",
               "type": "url",
               "url": "http://www.amazon.com/Anti-Oedipus-Capitalism-Schizophrenia-Penguin-Classics/dp/0143105825/ref=sr_1_1?s=books&ie=UTF8&qid=1370767938&sr=1-1&keywords=anti-oedipus"
            }, {
               "date_added": "13015763925285669",
               "guid": "37a91172-c88a-44bc-8e8f-d2c7fcd4a8a9",
               "id": "1598",
               "name": "Startup: A Silicon Valley Adventure: Jerry Kaplan: 9780140257311: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/0140257314/ref=cm_cr_asin_lnk"
            }, {
               "date_added": "13020197508159840",
               "guid": "15a937c7-c3c8-4c78-815d-41ce54e90aca",
               "id": "1622",
               "name": "Foundations of 3D Computer Graphics: Steven J. Gortler: 9780262017350: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Foundations-Computer-Graphics-Steven-Gortler/dp/0262017350/ref=sr_1_1?s=books&ie=UTF8&qid=1375685553&sr=1-1&keywords=foundations+of+3d+computer+graphics"
            }, {
               "date_added": "13020580634517916",
               "guid": "1db90a1e-6dba-42ea-8456-ad265a6641db",
               "id": "1586",
               "name": "The Essential Knuth: Donald E. Knuth, Edgar G. Daylight, Kurt De Grave: 9789491386039: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/The-Essential-Knuth-Donald-E/dp/9491386034/ref=sr_1_1?ie=UTF8&qid=1376106221&sr=8-1&keywords=the+essential+knuth"
            }, {
               "date_added": "13020585038961186",
               "guid": "55e739a6-0781-47b2-b008-d96da50bc7b3",
               "id": "1632",
               "name": "Number: The Language of Science: Tobias Dantzig, Joseph Mazur: 9780452288119: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Number-Language-Science-Tobias-Dantzig/dp/0452288118/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "13024628156536382",
               "guid": "3a243d84-3975-40f3-b2b9-63c6907ccede",
               "id": "1630",
               "name": "Stubborn Fact and Creative Advance: Thomas E. Hosinski: 9780847678280: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Stubborn-Creative-Advance-Thomas-Hosinski/dp/0847678288/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "13033279769743239",
               "guid": "347e0d0d-e14a-4d40-baf0-23377ff08e8c",
               "id": "1599",
               "name": "Amazon.com: The Social Construction of Reality: A Treatise in the Sociology of Knowledge eBook: Peter L. Berger, Thomas Luckmann: Books",
               "type": "url",
               "url": "http://www.amazon.com/Social-Construction-Reality-Sociology-Knowledge-ebook/dp/B004X36R6G/ref=sr_1_1?s=books&ie=UTF8&qid=1388806163&sr=1-1&keywords=peter+berger+social+construction+of+reality"
            }, {
               "date_added": "13034733632103184",
               "guid": "9955f0da-130c-4f41-a67c-81b6559d120e",
               "id": "1601",
               "name": "Coders at Work: Reflections on the Craft of Programming: Peter Seibel: 9781430219484: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/1430219483?ie=UTF8&tag=gigamonkeys-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1430219483"
            }, {
               "date_added": "13035345468265014",
               "guid": "fda1e867-6f80-4480-bbc9-5a802ebcf410",
               "id": "1538",
               "name": "The Marx-Engels Reader (Second Edition): Karl Marx, Friedrich Engels, Robert C. Tucker: 9780393090406: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/The-Marx-Engels-Reader-Second-Edition/dp/039309040X/ref=cm_cr_pr_sims_t"
            }, {
               "date_added": "13035425805171428",
               "guid": "4fe012c6-934c-4fd3-ad50-982d74ef3e01",
               "id": "1540",
               "name": "Amazon.com: The Essential Ananda K. Coomaraswamy (Perennial Philosophy Series) eBook: Rama Coomaraswamy, Ananda K. Coomaraswamy, Rama P. Coomaraswamy: Kindle Store",
               "type": "url",
               "url": "http://www.amazon.com/Essential-Ananda-Coomaraswamy-Perennial-Philosophy-ebook/dp/B004ASORF2/ref=sr_1_1?ie=UTF8&qid=1390952165&sr=8-1&keywords=ananda+coomaraswamy"
            }, {
               "date_added": "13037009097106651",
               "guid": "7968f88c-c032-4262-93f9-70a217d3baa6",
               "id": "1537",
               "name": "A Linguistic Study of the English Verb (Miami Linguistics Series): F. R Palmer: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Linguistic-Study-English-Linguistics-Series/dp/B0006BRQSC/ref=sr_1_1?ie=UTF8&qid=1392535479&sr=8-1&keywords=palmer+english+verb"
            }, {
               "date_added": "13037177078868734",
               "guid": "dad9da96-b63d-419e-a749-ae9688c0ebab",
               "id": "1535",
               "name": "Linked: How Everything Is Connected to Everything Else and What It Means for Business, Science, and Everyday Life: Albert-Laszlo Barabasi: 9780452284395: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Linked-Everything-Connected-Business-Everyday/dp/0452284392/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "13037699465884642",
               "guid": "9698a3d4-2050-4bce-b937-c30852d134ef",
               "id": "1580",
               "name": "The Art Of Probability: Richard W. Hamming: 9780201406863: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/The-Art-Probability-Richard-Hamming/dp/0201406861/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "13041034522589564",
               "guid": "fb375de1-9351-438b-b9b3-95655a220438",
               "id": "1543",
               "name": "Amazon.com: Sense and Sensibilia (9780195003079): J. L. Austin, G. J. Warnock: Books",
               "type": "url",
               "url": "http://www.amazon.com/Sense-Sensibilia-J-L-Austin/dp/0195003071/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "13058145521523098",
               "guid": "022f7862-157e-4b2c-9633-6ed898246195",
               "id": "1542",
               "name": "Amazon.com: The Precious Treasury of Philosophical Systems: A Treatise Elucidating the Meaning of the Entire Range of Buddhist Teachings (9781881847441): Richard Barron: Books",
               "type": "url",
               "url": "http://www.amazon.com/The-Precious-Treasury-Philosophical-Systems/dp/1881847446/"
            }, {
               "date_added": "13059439558730246",
               "guid": "cf1ebc2f-7ade-4e4d-b644-3ad336b9a614",
               "id": "1596",
               "name": "Essentials of Control Techniques and Theory: John Billingsley: 9781420091236: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Essentials-Control-Techniques-Theory-Billingsley/dp/1420091239"
            }, {
               "date_added": "13060850666940876",
               "guid": "0bd5e5e9-4851-4237-b601-8c60e96aec7c",
               "id": "1539",
               "name": "(S. Mac Lane)Mathematics: Form and Function (9780387962177): Saunders MacLane: Books",
               "type": "url",
               "url": "http://www.amazon.com/Mathematics-Form-Function-Saunders-MacLane/dp/0387962174/ref=la_B000AP7SV4_1_5?s=books&ie=UTF8&qid=1416376747&sr=1-5"
            }, {
               "date_added": "13060866039276056",
               "guid": "4e4e8190-4bc5-4cdb-a648-1f0671197961",
               "id": "564",
               "meta_info": {
                  "last_visited_desktop": "13192866855207378"
               },
               "name": "Amazon.com: The Cambridge Handbook of Situated Cognition (Cambridge Handbooks in Psychology) (9780521848329): Philip Robbins, Murat Aydede: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Cambridge-Handbook-Cognition-Handbooks-Psychology/dp/0521848326/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "13060866555530089",
               "guid": "2432c685-be7b-417b-b14e-c524863160a9",
               "id": "1541",
               "name": "Amazon.com: On Certainty (English and German Edition) (9780061316869): Ludwig Wittgenstein, G. E. M. Anscombe, G. H. von Wright, Denis Paul: Books",
               "type": "url",
               "url": "http://www.amazon.com/Certainty-English-German-Ludwig-Wittgenstein/dp/0061316865/ref=sr_1_3?ie=UTF8&qid=1416392932&sr=8-3&keywords=%22on+certainty%22"
            }, {
               "date_added": "13060868780323929",
               "guid": "12327196-01d1-4891-aa3c-10c703adfdb9",
               "id": "1616",
               "name": "Programming and Metaprogramming in the Human Biocomputer: Theory and Experiments: Dr. John C. Lilly: 9780692217894: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Programming-Metaprogramming-Human-Biocomputer-Experiments/dp/0692217894/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "13060869470249714",
               "guid": "78ed3cdb-58f2-4c50-8a3d-5b285c0f1e57",
               "id": "1557",
               "name": "Simulations of God: The Science of Belief: John C. Lilly: 9780553024425: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Simulations-God-The-Science-Belief/dp/0553024426/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "13060869555381013",
               "guid": "148eb393-7c39-4319-a293-f5f4c1649e05",
               "id": "1530",
               "name": "Philosophy in a New Century: Selected Essays: John R. Searle: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Philosophy-New-Century-Selected-Essays/dp/B008SMM2OE/ref=cm_cr-mr-title"
            }, {
               "date_added": "13060870720649513",
               "guid": "09752241-7dd9-48a7-89d3-b9fdf75e4f59",
               "id": "1507",
               "name": "Visual Space Perception: A Primer: Maurice Hershenson: 9780262581677: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Visual-Space-Perception-Maurice-Hershenson/dp/0262581671/ref=la_B001HD06OE_1_1?s=books&ie=UTF8&qid=1416397116&sr=1-1"
            }, {
               "date_added": "13061006735666655",
               "guid": "3cb76bdf-4d21-4755-81f9-6e4e207545b7",
               "id": "1514",
               "name": "Amazon.com: Incandescence eBook: Greg Egan: Kindle Store",
               "type": "url",
               "url": "http://www.amazon.com/Incandescence-Greg-Egan-ebook/dp/B0070YQOHW/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "13061038038584211",
               "guid": "cabefbf9-f624-4be5-a738-11ca9fefb74f",
               "id": "1520",
               "name": "Tree of Knowledge: Humberto R. Maturana, Francisco Varela: 9780877736424: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Tree-Knowledge-Humberto-R-Maturana/dp/0877736421/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "13061517514493846",
               "guid": "20c04257-5466-46ec-a528-7826382fdd80",
               "id": "1506",
               "name": "Amazon.com: lives of great religious books",
               "type": "url",
               "url": "http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=lives+of+great+religious+books&rh=i%3Aaps%2Ck%3Alives+of+great+religious+books"
            }, {
               "date_added": "13061519021389737",
               "guid": "6123cdad-9572-4c0b-86c9-6322952e6ab5",
               "id": "583",
               "meta_info": {
                  "last_visited_desktop": "13192866851980291"
               },
               "name": "Amazon.com: Cognitive Systems and the Extended Mind (Philosophy of Mind) (9780199767595): Robert D. Rupert: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Cognitive-Systems-Extended-Mind-Philosophy/dp/0199767599/ref=la_B0028OE2KK_1_1?s=books&ie=UTF8&qid=1417045398&sr=1-1"
            }, {
               "date_added": "13061714604041970",
               "guid": "f12e13cb-6655-4642-af2a-f859d5b98354",
               "id": "1525",
               "name": "ACM Classic Books Series",
               "type": "url",
               "url": "http://dl.acm.org/classics.cfm?CFID=603479522&CFTOKEN=21766159"
            }, {
               "date_added": "13061949979639795",
               "guid": "a2533fda-226e-4939-b2b4-43b493188494",
               "id": "1500",
               "name": "Why Software Sucks...and What You Can Do About It: David S. Platt: 9780321466754: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Why-Software-Sucks-What-About/dp/0321466756#customerReviews"
            }, {
               "date_added": "13062624131461168",
               "guid": "fbba33ff-fea8-48ef-9724-f2970d097f73",
               "id": "1512",
               "name": "JavaScript and JQuery: Interactive Front-End Web Development: Jon Duckett: 9781118531648: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/JavaScript-JQuery-Interactive-Front-End-Development/dp/1118531647/ref=cm_cr_pr_product_top?ie=UTF8"
            }, {
               "date_added": "13063615764198392",
               "guid": "c220751f-d2a6-43ed-b213-e51e88b6d2d0",
               "id": "1523",
               "name": "Object Design: Roles, Responsibilities, and Collaborations: Rebecca Wirfs-Brock, Alan McKean: 0785342379433: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/0201379430?ie=UTF8&tag=raganwald001-20&linkCode=as2&camp=211189&creative=374929&creativeASIN=0201379430#customerReviews"
            }, {
               "date_added": "13068595080356000",
               "guid": "aa4d4126-cf31-4915-9299-0daeab6688d4",
               "id": "1509",
               "name": "Amazon.com: Civilization and Capitalism, 15th-18th Century, Vol. I: The Structure of Everyday Life (Civilization & Capitalism, 15th-18th Century) (9780520081147): Fernand Braudel, Siân Reynold: Books",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/0520081145/ref=kinw_rke_tl_1"
            }, {
               "date_added": "13070765560906000",
               "guid": "eb2509e0-d644-44cd-b334-6a7a5859c344",
               "id": "1634",
               "name": "Computing: A Concise History (The MIT Press Essential Knowledge series): Paul E. Ceruzzi: 9780262517676: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Computing-Concise-History-Essential-Knowledge/dp/0262517671/ref=sr_1_2?ie=UTF8&qid=1426291245&sr=8-2&keywords=history+of+computer"
            }, {
               "date_added": "13070856197163000",
               "guid": "c180a681-a2bc-495f-b99c-fa744e6cbcc2",
               "id": "1516",
               "name": "The Psychology of Computer Programming: Silver Anniversary Edition: 9780932633422: Computer Science Books @ Amazon.com",
               "type": "url",
               "url": "http://www.amazon.com/Psychology-Computer-Programming-Silver-Anniversary/dp/0932633420/ref=sr_1_1?ie=UTF8&qid=1426375716&sr=8-1&keywords=the+psychology+of+computer+programming#customerReviews"
            }, {
               "date_added": "13073003201869000",
               "guid": "ad6fd8c3-f4b1-42c3-a1b9-615eadcd273b",
               "id": "1527",
               "name": "The Situated Self - Kindle edition by J. T. Ismael. Politics & Social Sciences Kindle eBooks @ Amazon.com.",
               "type": "url",
               "url": "http://www.amazon.com/Situated-Self-J-T-Ismael-ebook/dp/B000SBJI7C/ref=sr_1_1_twi_2_kin?ie=UTF8&qid=1428529264&sr=8-1&keywords=the+situated+self"
            }, {
               "date_added": "13073083901011000",
               "guid": "42517727-6a3c-411d-9764-76aef47badd8",
               "id": "1503",
               "name": "Quantum Computing since Democritus: Scott Aaronson: 9780521786492: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Quantum-Computing-since-Democritus-Aaronson/dp/0521199565/ref=sr_1_1?ie=UTF8&qid=1428609653&sr=8-1&keywords=quantum+computing+since+democritus#customerReviews"
            }, {
               "date_added": "13073132615879000",
               "guid": "7d322275-d2a4-4516-ac44-711d402c4f10",
               "id": "1534",
               "name": "The Martian: Andy Weir: 9780553418026: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Martian-Andy-Weir/dp/0553418025/ref=sr_1_1?ie=UTF8&qid=1428658864&sr=8-1&keywords=the+martian#customerReviews"
            }, {
               "date_added": "13073133144293000",
               "guid": "02c17b6f-283c-4a0b-a100-a5ceeccde7a3",
               "id": "1594",
               "name": "The Signal and the Noise: Why So Many Predictions Fail--but Some Don't: Nate Silver: 9780143125082: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Signal-Noise-Many-Predictions-Fail--but/dp/0143125087/ref=sr_1_1?ie=UTF8&qid=1428659513&sr=8-1&keywords=the+signal+and+the+noise#customerReviews"
            }, {
               "date_added": "13073133924027000",
               "guid": "ce390e24-f9f0-4d79-9c1b-e671e28dbbeb",
               "id": "735",
               "name": "The Hard Thing About Hard Things: Building a Business When There Are No Easy Answers: Ben Horowitz: 9780062273208: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Hard-Thing-About-Things-Building/dp/0062273205/ref=sr_1_1?ie=UTF8&qid=1428660198&sr=8-1&keywords=the+hard+thing+about+hard+things#customerReviews"
            }, {
               "date_added": "13073699891852000",
               "guid": "22619363-8d1d-4d62-a688-fcbbe6e7c9d4",
               "id": "1612",
               "name": "From Mathematics to Generic Programming: Alexander A. Stepanov, Daniel E. Rose: 9780321942043: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Mathematics-Generic-Programming-Alexander-Stepanov/dp/0321942043"
            }, {
               "date_added": "13073932806031000",
               "guid": "f89fd4d2-6b62-448d-8c66-670a283fd16a",
               "id": "1519",
               "name": "On Intelligence: Jeff Hawkins, Sandra Blakeslee: 9780805078534: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Intelligence-Jeff-Hawkins/dp/0805078533/ref=sr_1_1?ie=UTF8&qid=1429458479&sr=8-1&keywords=on+intelligence+hawkins#customerReviews"
            }, {
               "date_added": "13074631436454000",
               "guid": "7184f4cc-2a7f-487d-bc91-21559c7259fa",
               "id": "1505",
               "name": "Purely Functional Data Structures: Chris Okasaki: 9780521663502: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Purely-Functional-Structures-Chris-Okasaki/dp/0521663504/ref=sr_1_1?ie=UTF8&qid=1430156272&sr=8-1&keywords=purely+functional+data+structures#customerReviews"
            }, {
               "date_added": "13075667698374000",
               "guid": "e0fcca9e-e733-49c8-a314-423c2b712c07",
               "id": "1508",
               "name": "Amazon.com: Venture Deals: Be Smarter Than Your Lawyer and Venture Capitalist (9781118443613): Brad Feld, Jason Mendelson, Dick Costolo: Books",
               "type": "url",
               "url": "http://www.amazon.com/Venture-Deals-Smarter-Lawyer-Capitalist/dp/1118443616/ref=sr_1_1?ie=UTF8&qid=1431123027&sr=8-1&keywords=venture+deals+brad+feld"
            }, {
               "date_added": "13078885065892000",
               "guid": "0bc190ba-fe53-4190-9e7f-2e5892ffa8bc",
               "id": "1570",
               "name": "Book of Numbers: A Novel: Joshua Cohen: 9780812996913: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Book-Numbers-Novel-Joshua-Cohen/dp/0812996917/ref=sr_1_1?ie=UTF8&qid=1434411314&sr=8-1&ppl=fresh&keywords=book+of+numbers#customerReviews"
            }, {
               "date_added": "13083880908595608",
               "guid": "f8cf6421-31ae-472b-a32b-205e59887716",
               "id": "1642",
               "name": "Reality Isn't What It Used to Be, Walter Truet Anderson - Amazon.com",
               "type": "url",
               "url": "http://www.amazon.com/Reality-Isnt-What-It-Used-ebook/dp/B000OI0EHM/ref=cm_cr_pr_product_top?ie=UTF8"
            }, {
               "date_added": "13084960687741606",
               "guid": "81e53e42-4098-4a97-95c6-a04cf98b147d",
               "id": "1501",
               "name": "Seven Pillars of Wisdom: A Triumph: The Complete 1922 Text: T. E. Lawrence: 9781617201837: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Seven-Pillars-Wisdom-Triumph-Complete/dp/1617201839/ref=sr_1_1?ie=UTF8&qid=1440486402&sr=8-1&ppl=fresh&keywords=seven+pillars+of+wisdom#customerReviews"
            }, {
               "date_added": "13091522679769250",
               "guid": "074e73b7-76f6-4849-bcae-b057a91ccc75",
               "id": "1536",
               "name": "Synergetics: Explorations in the Geometry of Thinking: R. Buckminster Fuller, Arthur L. Loeb, E. J. Applewhite: 9780020653202: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Synergetics-Explorations-Geometry-Buckminster-Fuller/dp/0020653204/ref=sr_1_1?ie=UTF8&qid=1447047972&sr=8-1&keywords=synergetics#customerReviews"
            }, {
               "date_added": "13091522973430464",
               "guid": "ee50fd2c-e9e9-4bf3-a702-7420b5165d52",
               "id": "1629",
               "name": "Reinventing Your Life: The Breakthrough Program to End Negative Behavior and Feel Great Again: Jeffrey E. Young, Janet S. Klosko, Aaron T. Beck: 9780452272040: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Reinventing-Your-Life-Breakthrough-Negative/dp/0452272041/ref=sr_1_1?s=books&ie=UTF8&qid=1447049268&sr=1-1&keywords=reinventing+your+life#customerReviews"
            }, {
               "date_added": "13091523386997747",
               "guid": "5fe7ba52-925f-489c-a269-c66666682365",
               "id": "1510",
               "name": "Amazon.com: Dreadnought (9780345375568): Robert K. Massie: Books",
               "type": "url",
               "url": "http://www.amazon.com/Dreadnought-Robert-K-Massie/dp/0345375564/ref=cm_cr-mr-img"
            }, {
               "date_added": "13095636012903577",
               "guid": "4a2dc8ca-78d7-46d3-beda-5c68245e8587",
               "id": "1504",
               "name": "Slouching Towards Bethlehem: Essays (FSG Classics): Joan Didion: 9780374531386: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Slouching-Towards-Bethlehem-Essays-Classics/dp/0374531382/ref=sr_1_1?ie=UTF8&qid=1451162405&sr=8-1&keywords=slouching+towards+bethlehem"
            }, {
               "date_added": "13098149374005823",
               "guid": "628474ba-5a75-4ed5-a671-70b2b103183f",
               "id": "1533",
               "name": "Uncle Petros and Goldbach's Conjecture: A Novel of Mathematical Obsession: Apostolos Doxiadis: 9781582341286: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Uncle-Petros-Goldbachs-Conjecture-Mathematical/dp/1582341281/ref=pd_rhf_dp_s_cp_6?ie=UTF8&dpID=51jZB-hRq-L&dpSrc=sims&preST=_SL500_SR89%2C135_&refRID=1EH62EM97FGNFYPY48M2"
            }, {
               "date_added": "13098149577372355",
               "guid": "bb79af9a-c0fe-402c-b0f7-c27bc9b0f04e",
               "id": "1528",
               "name": "Amazon.com: Daniel Myers' review of Mind of Winter",
               "type": "url",
               "url": "http://www.amazon.com/gp/review/RNZP8WY1VHXAN?ref_=glimp_1rv_cl"
            }, {
               "date_added": "13098149623624539",
               "guid": "a4b62522-2c69-4806-988a-38bdc3a073ce",
               "id": "1574",
               "name": "Sophie's World: A Novel About the History of Philosophy (FSG Classics) - Kindle edition by Jostein Gaarder, Paulette Møller. Politics & Social Sciences Kindle eBooks @ Amazon.com.",
               "type": "url",
               "url": "http://www.amazon.com/Sophies-World-History-Philosophy-Classics-ebook/dp/B00699SDR8/ref=sr_1_1?s=books&ie=UTF8&qid=1453675780&sr=1-1&keywords=sophie%27s+world"
            }, {
               "date_added": "13100156958371887",
               "guid": "403f2359-4c0d-4684-9b7b-3c52fec37643",
               "id": "812",
               "name": "Shards of Honor (Vorkosigan Saga): Lois McMaster Bujold: 9781476781105: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Shards-Honor-Vorkosigan-McMaster-Bujold/dp/1476781109/ref=sr_1_1?ie=UTF8&qid=1455482624&sr=8-1&keywords=shards+of+honor#customerReviews"
            }, {
               "date_added": "13102072004046634",
               "guid": "b9bb454f-51e1-42e3-add1-eec50dbe3a49",
               "id": "1517",
               "name": "Software and Mind: The Mechanistic Myth and Its Consequences: Andrei Sorin: 8601419036790: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Software-Mind-Mechanistic-Myth-Consequences/dp/0986938904/ref=sr_1_1?ie=UTF8&qid=1457511646&sr=8-1&keywords=software+and+mind#customerReviews"
            }, {
               "date_added": "13108945734284331",
               "guid": "b52f0b0d-0e70-4720-8dc9-2c8a905cabe0",
               "id": "1603",
               "name": "The Good Earth (Oprah's Book Club): Pearl S. Buck: 9780743272933: Amazon.com: Books",
               "type": "url",
               "url": "http://www.amazon.com/Good-Earth-Oprahs-Book-Club/dp/0743272935/ref=sr_1_1?ie=UTF8&qid=1456010519&sr=8-1&keywords=the+good+earth#customerReviews"
            }, {
               "date_added": "13114827786092805",
               "guid": "06b68e09-ca83-473d-a8cc-a6aab119760a",
               "id": "830",
               "name": "How to Read Heidegger (How to Read): Mark Wrathall, Simon Critchley: 9780393328806: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/How-Read-Heidegger/dp/0393328805/ref=sr_1_1?ie=UTF8&qid=1470353998&sr=8-1&keywords=how+to+read+heidegger#customerReviews"
            }, {
               "date_added": "13114827876617936",
               "guid": "d262386f-526b-4f74-b71f-723585334022",
               "id": "831",
               "name": "Amazon.com: How to Read Nietzsche (How to Read) (9780393328219): Keith Ansell Pearson, Simon Critchley: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/How-Read-Nietzsche/dp/039332821X/ref=pd_bxgy_14_img_2?ie=UTF8&psc=1&refRID=74NT76HCERCQDHX59201"
            }, {
               "date_added": "13116800545632629",
               "guid": "21bdaa66-05ab-4422-992d-b551c2149dee",
               "id": "834",
               "name": "Genius At Play: The Curious Mind of John Horton Conway: Siobhan Roberts: 9781620405932: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Genius-At-Play-Curious-Horton/dp/1620405938/"
            }, {
               "date_added": "13123723125595956",
               "guid": "821b7506-9a90-4ef5-a2c5-1f7383223d2f",
               "id": "852",
               "name": "Oryx and Crake: Margaret Atwood: 8601200737585: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Oryx-Crake-Margaret-Atwood/dp/0385721676/"
            }, {
               "date_added": "13124593001381200",
               "guid": "29836536-50d9-4374-81f0-fe9af9d08f03",
               "id": "860",
               "name": "Emile Durkheim: Selected Writings: Emile Durkheim, Anthony Giddens: 9780521097123: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Emile-Durkheim-Selected-Writings/dp/0521097126/ref=sr_1_5?ie=UTF8&qid=1480118890&sr=8-5&keywords=durkheim#customerReviews"
            }, {
               "date_added": "13125025002536792",
               "guid": "fc8c1dd3-97e6-4a3d-89ae-26afd31aa471",
               "id": "862",
               "name": "SaaS Entrepreneur: Merrill R. Chapman, Zach Nelson: 9780967200835: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/SaaS-Entrepreneur-Merrill-R-Chapman/dp/0967200830/"
            }, {
               "date_added": "13125188429686456",
               "guid": "57affe69-6ee4-444e-b7a3-b0e1a437f530",
               "id": "863",
               "name": "The Sense of Style: The Thinking Person's Guide to Writing in the 21st Century: Steven Pinker: 9780670025855: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/The-Sense-Style-Thinking-Person%C2%92s/dp/0670025852?ie=UTF8&tag=thstsst-20&linkCode=as2&camp=1789&creative=390957"
            }, {
               "date_added": "13125190885411258",
               "guid": "4957071f-a736-439d-aae1-e925cdf49778",
               "id": "864",
               "name": "Amazon.com: French Theory: How Foucault, Derrida, Deleuze, & Co. Transformed the Intellectual Life of the United States (9780816647330): Francois Cusset, Jeff Fort: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/French-Theory-Foucault-Transformed-Intellectual/dp/081664733X/ref=sr_1_1?ie=UTF8&qid=1480715469&sr=8-1&keywords=French+Theory%3A+How+Foucault%2C+Derrida%2C+Deleuze%2C+%26+Co.+Transformed+the+Intellectual+Life+of+the+United+States#customerReviews"
            }, {
               "date_added": "13125190899131442",
               "guid": "72ac25b5-a4bb-4c79-aa21-9d77b0b12379",
               "id": "865",
               "name": "The Killing of History: How Literary Critics and Social Theorists Are Murdering Our Past: Keith Windschuttle: 9781893554122: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Killing-History-Literary-Theorists-Murdering/dp/1893554120/ref=sr_1_1?ie=UTF8&qid=1480715421&sr=8-1&keywords=The+Killing+of+History%3A+How+Literary+Critics+and+Social+Theorists+are+Murdering+Our+Past#customerReviews"
            }, {
               "date_added": "13125205050997191",
               "guid": "7a3a95c0-10ce-48ff-b8da-b20ed45896c1",
               "id": "1546",
               "name": "Amazon.ca:Customer Reviews: The Construction of Social Reality",
               "type": "url",
               "url": "https://www.amazon.ca/product-reviews/0684831791/ref=cm_cr_dp_see_all_btm?ie=UTF8&reviewerType=all_reviews&showViewpoints=1&sortBy=recent"
            }, {
               "date_added": "13125366630867035",
               "guid": "d73d571a-62de-493d-87da-bf2757f9d01c",
               "id": "1619",
               "name": "The Social Construction of What?: Ian Hacking: 9780674004122: History & Surveys: Amazon Canada",
               "type": "url",
               "url": "https://www.amazon.ca/Social-Construction-What-Ian-Hacking/dp/0674004124/ref=cm_cr_arp_d_product_top?ie=UTF8"
            }, {
               "date_added": "13125473265028938",
               "guid": "946e8356-7841-43b6-8849-18b6192046b5",
               "id": "868",
               "name": "Shoe Dog: A Memoir by the Creator of Nike: Phil Knight: 9781501135910: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Shoe-Dog-Memoir-Creator-Nike/dp/1501135910/ref=sr_1_1?ie=UTF8&qid=1480999536&sr=8-1&keywords=shoe+dog#customerReviews"
            }, {
               "date_added": "13125473409535781",
               "guid": "0a003acf-f867-4135-a684-e8e88efdf10d",
               "id": "869",
               "name": "The Gene: An Intimate History: 9781476733500: Medicine & Health Science Books @ Amazon.com",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Gene-Intimate-History-Siddhartha-Mukherjee/dp/1476733503/ref=sr_1_1?ie=UTF8&qid=1480999373&sr=8-1&keywords=the+gene#customerReviews"
            }, {
               "date_added": "13126053168108298",
               "guid": "91d82402-ceae-42fc-8da1-6ac05855fc83",
               "id": "874",
               "name": "The First Tycoon: The Epic Life of Cornelius Vanderbilt: T.J. Stiles: 9781400031740: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/First-Tycoon-Epic-Cornelius-Vanderbilt/dp/1400031745/ref=sr_1_1?ie=UTF8&qid=1481579512&sr=8-1&keywords=the+first+tycoon#customerReviews"
            }, {
               "date_added": "13126057359457852",
               "guid": "65392562-5786-48b5-bbb7-6593a09a06ba",
               "id": "875",
               "name": "The End of Eternity: Isaac Asimov: 9780765319197: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/End-Eternity-Isaac-Asimov/dp/0765319195/ref=sr_1_1?ie=UTF8&qid=1481583584&sr=8-1&keywords=the+end+of+eternity#customerReviews"
            }, {
               "date_added": "13126304857869338",
               "guid": "ba109ea6-5462-4deb-9674-cd39d8803ffa",
               "id": "878",
               "name": "Amazon.com: The Strategy of Conflict (9780674840317): Thomas C. Schelling: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Strategy-Conflict-Thomas-C-Schelling/dp/0674840313/ref=sr_1_2?ie=UTF8&qid=1481830476&sr=8-2&keywords=tom+schelling#customerReviews"
            }, {
               "date_added": "13127769391288519",
               "guid": "0796a188-73cf-40e0-a5e0-ed3f0910ae62",
               "id": "881",
               "name": "Amazon.com: The Hoax eBook: Clifford Irving: Kindle Store",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Hoax-Clifford-Irving-ebook/dp/B00J90C13Q/ref=sr_1_6?ie=UTF8&qid=1483230601&sr=8-6&keywords=the+hoax#customerReviews"
            }, {
               "date_added": "13127770666171884",
               "guid": "626640ff-ef68-4588-a44c-7131ce661b0f",
               "id": "882",
               "name": "The Universe in a Nutshell: Stephen William Hawking: 8601400258194: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Universe-Nutshell-Stephen-William-Hawking/dp/055380202X/ref=sr_1_1?ie=UTF8&qid=1483296731&sr=8-1&keywords=the+universe+in+a+nutshell+by+stephen+hawking#customerReviews"
            }, {
               "date_added": "13127771509000433",
               "guid": "01200630-3cb8-4573-854c-8c2f89f8cd04",
               "id": "883",
               "name": "American Philosophy: A Love Story: John Kaag: 9780374154486: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/American-Philosophy-Story-John-Kaag/dp/0374154481/"
            }, {
               "date_added": "13128298907685206",
               "guid": "f3220241-216f-4c21-952a-3ce23b023f5b",
               "id": "1502",
               "name": "Amazon.com: Casanova: The World of a Seductive Genius (9781476716497): Laurence Bergreen: Books",
               "type": "url",
               "url": "https://www.amazon.com/Casanova-Seductive-Genius-Laurence-Bergreen/dp/1476716498/ref=sr_1_1?ie=UTF8&qid=1483825242&sr=8-1&keywords=CASANOVA+The+World+of+a+Seductive+Genius"
            }, {
               "date_added": "13128472948835897",
               "guid": "a219c543-77f6-48a0-8fd1-a50b152a98bd",
               "id": "891",
               "name": "Amazon.com: The Master of Go (9780679761068): Yasunari Kawabata, Edward G. Seidensticker: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Master-Go-Yasunari-Kawabata/dp/0679761063/ref=pd_sim_14_4?_encoding=UTF8&pd_rd_i=0679761063&pd_rd_r=HW088XYH9AHWMG3WMANH&pd_rd_w=Z6aUo&pd_rd_wg=jTU0T&psc=1&refRID=HW088XYH9AHWMG3WMANH"
            }, {
               "date_added": "13128554106500069",
               "guid": "6eb4b4f6-35ba-406a-8cfb-0ce39fee4f3e",
               "id": "892",
               "name": "Amazon.com: The Tale of Genji: (Penguin Classics Deluxe Edition) (9780142437148): Murasaki Shikibu, Royall Tyler: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Tale-Genji-Penguin-Classics-Deluxe/dp/014243714X"
            }, {
               "date_added": "13129067715090026",
               "guid": "08372f19-304a-457b-839b-cf0b38e93162",
               "id": "896",
               "name": "Language Implementation Patterns: Create Your Own Domain-Specific and General Programming Languages (Pragmatic Programmers): Terence Parr: 9781934356456: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Language-Implementation-Patterns-Domain-Specific-Programming/dp/193435645X/"
            }, {
               "date_added": "13129152749979713",
               "guid": "fe4d0e2c-716b-4406-b507-c6c2dbae9881",
               "id": "897",
               "name": "Freud: In His Time and Ours: Élisabeth Roudinesco, Catherine Porter: 9780674659568: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Freud-Time-Ours-%C3%89lisabeth-Roudinesco/dp/0674659562"
            }, {
               "date_added": "13129246675943788",
               "guid": "b64d596d-b0fa-4705-a36f-259a75644b30",
               "id": "898",
               "name": "Godel's Theorem Simplified: Harry J. Gensler: 9780819138699: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Godels-Theorem-Simplified-Harry-Gensler/dp/081913869X"
            }, {
               "date_added": "13129765980582936",
               "guid": "81fe0f27-0103-4b1a-afca-d991b82282a0",
               "id": "902",
               "name": "Amazon.com: An Introduction to Statistical Learning: with Applications in R (Springer Texts in Statistics) (9781461471370): Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/1461471370/"
            }, {
               "date_added": "13133129522337966",
               "guid": "47d3ebf4-c73f-4ad7-83ca-3b97b5123164",
               "id": "922",
               "meta_info": {
                  "last_visited_desktop": "13133129522365156"
               },
               "name": "Amo, Amas, Amat... and All That: How to Become a Latin Lover: Harry Mount: 9781904977544: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Amo-Amas-Amat-and-All-That-How-to-Become-a-Latin-Lover/dp/1904977545/ref=cm_cr_dp_d_rvw_txt?ie=UTF8"
            }, {
               "date_added": "13133479559807091",
               "guid": "96a0981f-7e98-4b51-9362-85c4643626d6",
               "id": "923",
               "meta_info": {
                  "last_visited_desktop": "13133479559812581"
               },
               "name": "Language Implementation Patterns: Create Your Own Domain-Specific and General Programming Languages (Pragmatic Programmers): Terence Parr: 9781934356456: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Language-Implementation-Patterns-Domain-Specific-Programming/dp/193435645X/ref=sr_1_1?ie=UTF8&qid=1489005902&sr=8-1&keywords=language+implementation+patterns#customerReviews"
            }, {
               "date_added": "13134421596510418",
               "guid": "955a4ecc-75eb-4b12-a5ed-443525c82e11",
               "id": "924",
               "meta_info": {
                  "last_visited_desktop": "13134421596514478"
               },
               "name": "Amazon.com: Sapiens: A Brief History of Humankind (9780062316097): Yuval Noah Harari: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Sapiens-Humankind-Yuval-Noah-Harari/dp/0062316095/ref=sr_1_1?ie=UTF8&qid=1489947876&sr=8-1&keywords=sapiens#customerReviews"
            }, {
               "date_added": "13135631441465865",
               "guid": "d35cc86f-ae18-4388-9889-6a4de55d7d58",
               "id": "932",
               "meta_info": {
                  "last_visited_desktop": "13135631441469143"
               },
               "name": "Amazon.com: In Over Our Heads: The Mental Demands of Modern Life (9780674445888): Robert Kegan: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Over-Our-Heads-Mental-Demands/dp/0674445880/"
            }, {
               "date_added": "13135798150488741",
               "guid": "7506a88c-5f4d-4489-8f16-02986dc51ceb",
               "id": "935",
               "meta_info": {
                  "last_visited_desktop": "13135798150497361"
               },
               "name": "New York 2140: Kim Stanley Robinson: 9780316262347: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/New-York-2140-Stanley-Robinson/dp/031626234X/ref=sr_1_1?ie=UTF8&qid=1491324471&sr=8-1&keywords=new+york+2140#customerReviews"
            }, {
               "date_added": "13137626671315531",
               "guid": "6a2dfb2e-1150-493d-85f7-acbcaba747d5",
               "id": "943",
               "meta_info": {
                  "last_visited_desktop": "13137626671316663"
               },
               "name": "Amazon.com: Angry White Pyjamas: A Scrawny Oxford Poet Takes Lessons From The Tokyo Riot Police (9780688175375): Robert Twigger: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Angry-White-Pyjamas-Scrawny-Lessons/dp/0688175376/ref=sr_1_1?ie=UTF8&qid=1493152715&sr=8-1&keywords=Angry+white+pyjamas#customerReviews"
            }, {
               "date_added": "13137968821727682",
               "guid": "8487d653-ea19-4f98-b08b-bfbe5cc50720",
               "id": "946",
               "meta_info": {
                  "last_visited_desktop": "13137968821905537"
               },
               "name": "Move Fast and Break Things: How Facebook, Google, and Amazon Cornered Culture and Undermined Democracy: Jonathan Taplin: 9780316275774: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Move-Fast-Break-Things-Undermined/dp/0316275778/ref=sr_1_1?ie=UTF8&qid=1493494632&sr=8-1&keywords=move+fast+and+break+things"
            }, {
               "date_added": "13137969676663440",
               "guid": "734236bf-2fd2-430d-ad7c-fe670307e9c1",
               "id": "947",
               "meta_info": {
                  "last_visited_desktop": "13137969676665680"
               },
               "name": "Amazon.com: Chaos Monkeys: Obscene Fortune and Random Failure in Silicon Valley eBook: Antonio Garcia Martinez: Kindle Store",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Chaos-Monkeys-Obscene-Fortune-Failure-ebook/dp/B019MMUAAQ/ref=sr_1_1_twi_kin_2?ie=UTF8&qid=1493495245&sr=8-1&keywords=chaos+monkeys"
            }, {
               "date_added": "13144921567014379",
               "guid": "70555b28-237d-4ee1-8a67-69fb76c03e9c",
               "id": "969",
               "meta_info": {
                  "last_visited_desktop": "13144921567017102"
               },
               "name": "Star Maker: Olaf Stapledon: 9780486466835: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Star-Maker-Olaf-Stapledon/dp/0486466833/ref=sr_1_1?ie=UTF8&qid=1500446747&sr=8-1&keywords=star+maker+stapledon#customerReviews"
            }, {
               "date_added": "13145215504730560",
               "guid": "d85a4ba0-86d8-43e1-abeb-d7a16761c00f",
               "id": "973",
               "meta_info": {
                  "last_visited_desktop": "13145215504759832"
               },
               "name": "All of Statistics: A Concise Course in Statistical Inference (Springer Texts in Statistics): Larry Wasserman: 9780387402727: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/All-Statistics-Statistical-Inference-Springer/dp/0387402721"
            }, {
               "date_added": "13145498732373100",
               "guid": "c5a1808f-b9ac-4d72-9f51-9bf7bbbcaf0c",
               "id": "977",
               "meta_info": {
                  "last_visited_desktop": "13145498732489822"
               },
               "name": "A Guide to Better Movement: The Science and Practice of Moving With More Skill And Less Pain: Todd R. Hargrove: 9780991542307: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Guide-Better-Movement-Science-Practice/dp/0991542304/ref=sr_1_1?ie=UTF8&qid=1500926861&sr=8-1&keywords=a+guide+to+better+movement#customerReviews"
            }, {
               "date_added": "13146532882069160",
               "guid": "83dd0c04-0987-406c-828c-a17439d60ea1",
               "id": "982",
               "meta_info": {
                  "last_visited_desktop": "13146532882071694"
               },
               "name": "Man's Search for Meaning: Viktor E. Frankl, William J. Winslade, Harold S. Kushner: 8580001069371: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Mans-Search-Meaning-Viktor-Frankl/dp/080701429X/ref=sr_1_1?ie=UTF8&qid=1499102123&sr=8-1&keywords=man%27s+search+for+meaning#customerReviews"
            }, {
               "date_added": "13147085041197015",
               "guid": "b25b51de-3674-41de-8f8b-e3723972f8c2",
               "id": "986",
               "meta_info": {
                  "last_visited_desktop": "13147085041201257"
               },
               "name": "A Philosophy of Loneliness: Lars Svendsen, Kerri Pierce: 9781780237473: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Philosophy-Loneliness-Lars-Svendsen/dp/1780237472/ref=sr_1_1?ie=UTF8&qid=1502610594&sr=8-1&keywords=a+philosophy+of+loneliness"
            }, {
               "date_added": "13148374545117138",
               "guid": "2b44d4b1-5b69-40b9-9b99-7b57a5e5b2b7",
               "id": "990",
               "meta_info": {
                  "last_visited_desktop": "13148374545130238"
               },
               "name": "Playing at the World: Jon Peterson: 9780615642048: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/0615642047/ref=cm_sw_su_dp"
            }, {
               "date_added": "13152141027567607",
               "guid": "05659a48-b2c2-4262-9aa2-0e5d6e9ceaf3",
               "id": "1008",
               "meta_info": {
                  "last_visited_desktop": "13152141027584022"
               },
               "name": "Confessions (Modern Library): Augustine, Sarah Ruden: 9780812996562: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Confessions-Modern-Library-Augustine/dp/0812996569/ref=sr_1_1?ie=UTF8&qid=1507666445&sr=8-1&keywords=ruden+confessions#customerReviews"
            }, {
               "date_added": "13152840167372524",
               "guid": "81dc7b39-608a-491b-ba2a-b29dd0397cfc",
               "id": "1014",
               "meta_info": {
                  "last_visited_desktop": "13152840167385107"
               },
               "name": "Adaptive Markets: Financial Evolution at the Speed of Thought: Andrew W. Lo: 9780691135144: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Adaptive-Markets-Financial-Evolution-Thought/dp/0691135142/ref=sr_1_1?ie=UTF8&qid=1508366406&sr=8-1&keywords=adaptive+markets#customerReviews"
            }, {
               "date_added": "13152960456408870",
               "guid": "f5869427-2752-4bd6-ad0f-c01373105be3",
               "id": "1015",
               "meta_info": {
                  "last_visited_desktop": "13152960456435206"
               },
               "name": "Amazon.com: The Hero with a Thousand Faces (The Collected Works of Joseph Campbell) (8601404236419): Joseph Campbell: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Thousand-Faces-Collected-Joseph-Campbell/dp/1577315936/ref=mt_hardcover?_encoding=UTF8&me="
            }, {
               "date_added": "13153286647512599",
               "guid": "25341780-a2ea-4b08-9ee7-eb35440d5d4e",
               "id": "1018",
               "meta_info": {
                  "last_visited_desktop": "13153286647555272"
               },
               "name": "Complexity and the Function of Mind in Nature (Cambridge Studies in Philosophy and Biology): Peter Godfrey-Smith: 9780521451666: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Complexity-Function-Cambridge-Studies-Philosophy/dp/0521451663"
            }, {
               "date_added": "13153286689673399",
               "guid": "1debbb3f-a4f1-41f6-b754-693bd25698a2",
               "id": "1019",
               "meta_info": {
                  "last_visited_desktop": "13153286689677655"
               },
               "name": "Amazon.com: Darwinian Populations and Natural Selection (9780199596270): Peter Godfrey-Smith: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Darwinian-Populations-Natural-Selection-Godfrey-Smith/dp/0199596271"
            }, {
               "date_added": "13153287495475031",
               "guid": "13291904-aaad-4b1f-a234-b70526f56b83",
               "id": "1020",
               "meta_info": {
                  "last_visited_desktop": "13153287495479481"
               },
               "name": "The Enigma of Reason: Hugo Mercier, Dan Sperber: 9780674368309: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Enigma-Reason-Hugo-Mercier/dp/0674368304/ref=cm_cr_arp_d_product_top?ie=UTF8"
            }, {
               "date_added": "13153287773910102",
               "guid": "0c28a036-494a-4af9-8749-38800a8a8895",
               "id": "1021",
               "meta_info": {
                  "last_visited_desktop": "13153287773914468"
               },
               "name": "From Bacteria to Bach and Back: The Evolution of Minds: Daniel C. Dennett: 9780393242072: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Bacteria-Bach-Back-Evolution-Minds/dp/0393242072/ref=pd_sim_14_4?_encoding=UTF8&pd_rd_i=0393242072&pd_rd_r=Z2CV56M1BZ2NMW3EV29H&pd_rd_w=5hLgc&pd_rd_wg=NFmqq&psc=1&refRID=Z2CV56M1BZ2NMW3EV29H"
            }, {
               "date_added": "13154586800545031",
               "guid": "0ea1b30e-a10a-428b-ac0c-de9b53f0c5d6",
               "id": "1024",
               "meta_info": {
                  "last_visited_desktop": "13154586800562417"
               },
               "name": "Amazon.com: The Odyssey (9780393089059): Homer, Emily Wilson: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Odyssey-Homer/dp/0393089053/ref=sr_1_1?ie=UTF8&qid=1510111741&sr=8-1&keywords=odyssey+emily+wilson"
            }, {
               "date_added": "13156231975874510",
               "guid": "099a5e97-7572-4081-be65-f8924e02919f",
               "id": "1030",
               "meta_info": {
                  "last_visited_desktop": "13156231975893914"
               },
               "name": "The Professor and the Madman: A Tale of Murder, Insanity, and the Making of the Oxford English Dictionary: Simon Winchester: 0201560839783: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Professor-Madman-Insanity-English-Dictionary/dp/0060839783"
            }, {
               "date_added": "13156940568215330",
               "guid": "1aac8f1b-ca96-45eb-a0b0-1f0c863c9e6d",
               "id": "1034",
               "meta_info": {
                  "last_visited_desktop": "13156940568229060"
               },
               "name": "Why Buddhism is True: The Science and Philosophy of Meditation and Enlightenment: Robert Wright: 9781439195451: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Why-Buddhism-True-Philosophy-Enlightenment/dp/1439195455/ref=cm_cr_arp_d_product_top?ie=UTF8"
            }, {
               "date_added": "13157515344531599",
               "guid": "7afb85b8-3781-4367-85b5-bb6705e7f381",
               "id": "1038",
               "meta_info": {
                  "last_visited_desktop": "13157515344551460"
               },
               "name": "Quantum Computing for Computer Scientists: Noson S. Yanofsky, Mirco A. Mannucci: 9780521879965: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Quantum-Computing-Computer-Scientists-Yanofsky/dp/0521879965"
            }, {
               "date_added": "13157629552845718",
               "guid": "06bcd40a-30fe-4a09-a57c-1c11d8b0d965",
               "id": "1039",
               "meta_info": {
                  "last_visited_desktop": "13157629552860847"
               },
               "name": "The Rest Is Noise: Listening to the Twentieth Century: Alex Ross: 9780312427719: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Rest-Noise-Listening-Twentieth-Century/dp/0312427719/ref=cm_cr_arp_d_product_top?ie=UTF8"
            }, {
               "date_added": "13158454024086518",
               "guid": "083a3a8d-96fc-4206-9a10-98bccb6cc34e",
               "id": "1042",
               "meta_info": {
                  "last_visited_desktop": "13192868823850510"
               },
               "name": "Amazon.com: Embodiments of Mind (MIT Press) (9780262631143): Warren S. McCulloch, Seymour A. Papert, Jerome Y. Lettvin: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Embodiments-Mind-Press-Warren-McCulloch/dp/0262631148"
            }, {
               "date_added": "13159233375467800",
               "guid": "abbea7d1-4b23-4c55-8866-3dad40ddb59b",
               "id": "1044",
               "meta_info": {
                  "last_visited_desktop": "13191111696331997"
               },
               "name": "QED and the Men Who Made It: Silvan S. Schweber: 9780691033273: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/QED-Men-Made-Silvan-Schweber/dp/0691033277"
            }, {
               "date_added": "13159833995058594",
               "guid": "6a541f91-a559-48a5-a482-b0cef871ccd8",
               "id": "1045",
               "meta_info": {
                  "last_visited_desktop": "13159833995063520"
               },
               "name": "The Logical Structure of the World and Pseudoproblems in Philosophy (Open Court Classics): Rudolf Carnap, Rolf A. George: 9780812695236: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Logical-Structure-Pseudoproblems-Philosophy-Classics/dp/0812695232/ref=pd_sim_14_1?_encoding=UTF8&pd_rd_i=0812695232&pd_rd_r=WJJNE8APH1GJV8VW1NTF&pd_rd_w=UFekH&pd_rd_wg=tdHlJ&psc=1&refRID=WJJNE8APH1GJV8VW1NTF"
            }, {
               "date_added": "13159852108144130",
               "guid": "e43ba868-bb35-4513-8c93-a472175be18b",
               "id": "1046",
               "meta_info": {
                  "last_visited_desktop": "13159852119860734"
               },
               "name": "How Language Began: The Story of Humanity's Greatest Invention: Daniel L. Everett: 9780871407955: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/How-Language-Began-Humanitys-Invention/dp/0871407957/ref=cm_cr_arp_d_product_top?ie=UTF8"
            }, {
               "date_added": "13160396218504173",
               "guid": "db0b19ee-4d97-4207-977c-f990e0d84880",
               "id": "1048",
               "meta_info": {
                  "last_visited_desktop": "13160396218509855"
               },
               "name": "Amazon.com: The Essential Plotinus (Hackett Classics) (9780915144099): Plotinus, Elmer O'Brien S.J.: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Essential-Plotinus-Hackett-Classics/dp/0915144093#customerReviews"
            }, {
               "date_added": "13160396230580016",
               "guid": "da9985e8-5c33-417c-95aa-dec9747258e5",
               "id": "1049",
               "meta_info": {
                  "last_visited_desktop": "13160396230582674"
               },
               "name": "Amazon.com: Plotinus or the Simplicity of Vision (9780226311944): Pierre Hadot, Michael Chase: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Plotinus-Simplicity-Vision-Pierre-Hadot/dp/0226311945/ref=sr_1_1?ie=UTF8&qid=1515881291&sr=8-1&keywords=Plotinus+or+the+Simplicity+of+Vision#customerReviews"
            }, {
               "date_added": "13161396038548312",
               "guid": "7bea6e09-d3df-427d-a5f2-4ed55202b328",
               "id": "1051",
               "meta_info": {
                  "last_visited_desktop": "13161396038562351"
               },
               "name": "Amazon.com: Genome: The Autobiography of a Species in 23 Chapters (9780060932909): Matt Ridley: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/exec/obidos/ASIN/0060932902"
            }, {
               "date_added": "13161557583753739",
               "guid": "930faf5d-bfc4-46b0-8c1b-8b976d4c7d53",
               "id": "1053",
               "meta_info": {
                  "last_visited_desktop": "13161557583757285"
               },
               "name": "Amazon.com: Turtles All the Way Down (9780525555360): John Green: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Turtles-All-Down-John-Green/dp/0525555366#customerReviews"
            }, {
               "date_added": "13161660036581596",
               "guid": "2d2e4d71-98eb-4e00-9602-67edaceaa079",
               "id": "1054",
               "meta_info": {
                  "last_visited_desktop": "13161660036596890"
               },
               "name": "Amazon.com: Cell Biology by the Numbers (9780815345374): Ron Milo, Rob Phillips: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/0815345372?pd_rd_i=0815345372&psc=1&pd_rd_w=LwwBX&pd_rd_wg=gCZ6v&pd_rd_r=e532f8c1-8265-44a9-9c8b-d9a120f21f1c&ref_=pd_luc_rh_mrairec_03_01_t_img_lh#customerReviews"
            }, {
               "date_added": "13161660043385572",
               "guid": "6d221772-40f2-4816-873a-60606c11eb48",
               "id": "1055",
               "meta_info": {
                  "last_visited_desktop": "13161660043388726"
               },
               "name": "Amazon.com: Life's Ratchet: How Molecular Machines Extract Order from Chaos (9780465022533): Peter M. Hoffmann: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/0465022537?pd_rd_i=0465022537&psc=1&pd_rd_w=LwwBX&pd_rd_wg=gCZ6v&pd_rd_r=e532f8c1-8265-44a9-9c8b-d9a120f21f1c&ref_=pd_luc_rh_mrairec_03_02_t_img_lh#customerReviews"
            }, {
               "date_added": "13162250464205000",
               "guid": "15a4b63a-6220-4eed-9b5c-b14eb33650e5",
               "id": "1059",
               "meta_info": {
                  "last_visited_desktop": "13162250464214169"
               },
               "name": "Ignition!: An Informal History of Liquid Rocket Propellants: John Drury Clark, Isaac Asimov: 9780813595832: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Ignition-Informal-History-Liquid-Propellants/dp/0813595835/ref=sr_1_1?ie=UTF8&qid=1517776510&sr=8-1&keywords=ignition%21#customerReviews"
            }, {
               "date_added": "13162784340762271",
               "guid": "fbdbab13-ca2c-4f6a-99ab-61124fe476ed",
               "id": "1060",
               "meta_info": {
                  "last_visited_desktop": "13162784340781410"
               },
               "name": "The Foucault Reader: Michel Foucault, Paul Rabinow: 8601421644150: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Foucault-Reader-Michel/dp/0394713400/ref=sr_1_fkmr0_2?ie=UTF8&qid=1518310660&sr=8-2-fkmr0&keywords=in+the+cage+foucault#customerReviews"
            }, {
               "date_added": "13162788129528926",
               "guid": "9de26b91-0dc5-4585-9091-b2d9b3881954",
               "id": "1061",
               "meta_info": {
                  "last_visited_desktop": "13162788129532598"
               },
               "name": "Why Grow Up?: Subversive Thoughts for an Infantile Age: Susan Neiman: 9780374536145: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Why-Grow-Up-Subversive-Infantile/dp/0374536147/ref=cm_cr_arp_d_product_top?ie=UTF8"
            }, {
               "date_added": "13164103764081209",
               "guid": "ea4eb868-d60f-49f8-9fdf-392d397fc622",
               "id": "1066",
               "meta_info": {
                  "last_visited_desktop": "13164103764098681"
               },
               "name": "Amazon.com: Racing the Beam: The Atari Video Computer System (Platform Studies) (8601410204211): Nick Montfort, Ian Bogost: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Racing-Beam-Computer-Platform-Studies/dp/026201257X/ref=sr_1_1?ie=UTF8&qid=1519612052&sr=8-1&keywords=racing+the+beam#customerReviews"
            }, {
               "date_added": "13164238494827382",
               "guid": "9fe9154b-57f1-4652-b4f5-19f8c6ae25c2",
               "id": "1067",
               "meta_info": {
                  "last_visited_desktop": "13164238494829743"
               },
               "name": "(Douglas Copelnad)Marshall McLuhan: You Know Nothing of My Work!: Douglas Coupland: 9781935633167: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Marshall-McLuhan-Know-Nothing-Work/dp/1935633163/ref=pd_cp_14_2?_encoding=UTF8&pd_rd_i=1935633163&pd_rd_r=2T9VHXBDE69NAYXCTCKV&pd_rd_w=KsSJn&pd_rd_wg=v4H7G&psc=1&refRID=2T9VHXBDE69NAYXCTCKV"
            }, {
               "date_added": "13165465099352371",
               "guid": "7c387e63-d14d-426a-a5b1-067236645586",
               "id": "1071",
               "meta_info": {
                  "last_visited_desktop": "13165465099370185"
               },
               "name": "Musimathics: The Mathematical Foundations of Music (MIT Press) (Volume 1): Gareth Loy: 9780262516556: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Musimathics-Mathematical-Foundations-Music-Press/dp/0262516551/ref=sr_1_1?ie=UTF8&qid=1520991361&sr=8-1&keywords=Musimathics#customerReviews"
            }, {
               "date_added": "13166309142235619",
               "guid": "10c57509-c2d8-44e3-9a87-abf05615a035",
               "id": "1073",
               "meta_info": {
                  "last_visited_desktop": "13166309142252749"
               },
               "name": "Plato at the Googleplex: Why Philosophy Won't Go Away: Rebecca Goldstein: 9780307456724: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Plato-Googleplex-Philosophy-Wont-Away/dp/0307456722/ref=sr_1_1?ie=UTF8&qid=1521835208&sr=8-1&keywords=plato+at+the+googleplex#customerReviews"
            }, {
               "date_added": "13166926144930704",
               "guid": "afff2483-2458-4a1e-a98f-928afa089468",
               "id": "1649",
               "meta_info": {
                  "last_visited_desktop": "13166926146154223"
               },
               "name": "Didact Fiber: Incremental reconciliation – Hexacta Engineering",
               "type": "url",
               "url": "https://engineering.hexacta.com/didact-fiber-incremental-reconciliation-b2fe028dcaec"
            }, {
               "date_added": "13168333683667293",
               "guid": "fdf5e1cd-d05a-4f93-b9ee-795cd16077d5",
               "id": "1077",
               "meta_info": {
                  "last_visited_desktop": "13168333683694074"
               },
               "name": "Amazon.com: Probability: For the Enthusiastic Beginner (9781523318674): David J. Morin: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/1523318678/ref=cm_sw_r_cp_ep_dp_Osc1AbXKKCSZZ#customerReviews"
            }, {
               "date_added": "13168466426416021",
               "guid": "e0ec7a6d-9cc3-41ea-8f17-2a05cace1a1e",
               "id": "1078",
               "meta_info": {
                  "last_visited_desktop": "13168466426443786"
               },
               "name": "Up in the Old Hotel: Joseph Mitchell: 9780679746317: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Up-Old-Hotel-Joseph-Mitchell/dp/0679746315/ref=sr_1_1?s=books&ie=UTF8&qid=1510629721&sr=1-1&keywords=up+in+the+old+hotel+joseph+mitchell#customerReviews"
            }, {
               "date_added": "13168466907861408",
               "guid": "5da641b2-09c0-48c0-80f3-ae7489a2032f",
               "id": "1079",
               "meta_info": {
                  "last_visited_desktop": "13168466907875089"
               },
               "name": "The Power Broker: Robert Moses and the Fall of New York: Robert A. Caro: 9780394720241: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Power-Broker-Robert-Moses-Fall/dp/0394720245/ref=sr_1_1?s=books&ie=UTF8&qid=1511319795&sr=1-1&keywords=the+power+broker"
            }, {
               "date_added": "13168469426519096",
               "guid": "c11441dc-5e5f-4529-b050-eda6aa293b3c",
               "id": "1080",
               "meta_info": {
                  "last_visited_desktop": "13168469426522653"
               },
               "name": "Amazon.com: The City in History: Its Origins, Its Transformations, and Its Prospects (0000156180359): Lewis Mumford: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/City-History-Origins-Transformations-Prospects/dp/0156180359/ref=cm_cr_arp_d_product_top?ie=UTF8"
            }, {
               "date_added": "13168469620440292",
               "guid": "7f46bf9f-69fc-4749-a2d9-00b0c701a3b4",
               "id": "1081",
               "meta_info": {
                  "last_visited_desktop": "13168469620444661"
               },
               "name": "Amazon.com: Low Life: Lures and Snares of Old New York (9780374528997): Luc Sante: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Low-Life-Lures-Snares-York/dp/0374528993#customerReviews"
            }, {
               "date_added": "13168472175727046",
               "guid": "42a2e0ab-1f8b-4be1-9042-1ee34ca8c4a3",
               "id": "1082",
               "meta_info": {
                  "last_visited_desktop": "13168472294301904"
               },
               "name": "Amazon.com: After Virtue: A Study in Moral Theory, Third Edition (8601406770218): Alasdair MacIntyre: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/After-Virtue-Study-Moral-Theory/dp/0268035040/ref=sr_1_1?ie=UTF8&qid=1523997320&sr=8-1&keywords=after+virtue#customerReviews"
            }, {
               "date_added": "13168472307874172",
               "guid": "f2a2ceb5-b706-4822-9736-61e1b8322a12",
               "id": "1083",
               "meta_info": {
                  "last_visited_desktop": "13168472307877116"
               },
               "name": "Amazon.com: The Sleepwalkers: How Europe Went to War in 1914 (9780061146664): Christopher Clark: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Sleepwalkers-How-Europe-Went-1914/dp/0061146668/ref=sr_1_1?ie=UTF8&qid=1523997316&sr=8-1&keywords=the+sleepwalkers#customerReviews"
            }, {
               "date_added": "13169161192780310",
               "guid": "a65723d1-2939-41f0-8e99-8e68ee26a4b1",
               "id": "1084",
               "meta_info": {
                  "last_visited_desktop": "13169161192811163"
               },
               "name": "Practical Electronics for Inventors, Fourth Edition by Scherz, Paul, Monk, Simon(April 5, 2016) Paperback: Paul, Monk, Simon Scherz: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Practical-Electronics-Inventors-Fourth-Paperback/dp/B014S3YIKM/ref=sr_1_4?ie=UTF8&qid=1524669118&sr=8-4&keywords=practical+electronics+for+inventors%2C+fourth+edition"
            }, {
               "date_added": "13169251435246484",
               "guid": "c1b0f4ac-700d-4b8a-bb8e-36f872aab44c",
               "id": "1529",
               "meta_info": {
                  "last_visited_desktop": "13169251435263195"
               },
               "name": "Amazon.com: Meaning and Mental Representations (Advances in Semiotics) (9780253204967): Umberto Eco, Marco Santambrogio, Patrizia Violi: Books",
               "type": "url",
               "url": "https://www.amazon.com/Meaning-Mental-Representations-Advances-Semiotics/dp/0253204968"
            }, {
               "date_added": "13169252431526923",
               "guid": "4746393f-e29d-4dcf-8d91-f00722c1762e",
               "id": "1086",
               "meta_info": {
                  "last_visited_desktop": "13169252431535447"
               },
               "name": "Love in the Ruins: Walker Percy: 9780312243111: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Love-Ruins-Walker-Percy/dp/0312243111/ref=sr_1_1?ie=UTF8&qid=1524778661&sr=8-1&keywords=love+in+the+ruins#customerReviews"
            }, {
               "date_added": "13169850224240532",
               "guid": "a3cd5f4f-3da6-4564-8c2a-d60b7ac823e2",
               "id": "1087",
               "meta_info": {
                  "last_visited_desktop": "13169850224291733"
               },
               "name": "Fluent Python: Clear, Concise, and Effective Programming: Luciano Ramalho: 4708364244547: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Fluent-Python-Concise-Effective-Programming/dp/1491946008/"
            }, {
               "date_added": "13170460164433043",
               "guid": "a5f1da9d-9e97-411d-98e1-fd3039bb11c1",
               "id": "1088",
               "meta_info": {
                  "last_visited_desktop": "13170460164454272"
               },
               "name": "Dead Souls: Nikolai Gogol, Richard Pevear, Larissa Volokhonsky: 9780679776444: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Dead-Souls-Nikolai-Gogol/dp/0679776443/ref=sr_1_3?ie=UTF8&qid=1525985995&sr=8-3&keywords=dead+souls#customerReviews"
            }, {
               "date_added": "13170986117154032",
               "guid": "df5c66df-1b0c-4027-a8fd-384926c282d1",
               "id": "1089",
               "meta_info": {
                  "last_visited_desktop": "13170986117166418"
               },
               "name": "The Almost Nearly Perfect People: Behind the Myth of the Scandinavian Utopia: Michael Booth: 9781250081568: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Almost-Nearly-Perfect-People-Scandinavian/dp/1250081564/ref=sr_1_1?ie=UTF8&qid=1526512011&sr=8-1&keywords=The+Almost+Nearly+Perfect+People#customerReviews"
            }, {
               "date_added": "13171003487451957",
               "guid": "a53f72b7-11af-4b26-935b-a4950c1bf206",
               "id": "1521",
               "meta_info": {
                  "last_visited_desktop": "13171003487460693"
               },
               "name": "From Prague to Paris: A Critique of Structuralist and Post-Structuralist Thought: J. G. Merquior: 9780860918608: Amazon.com: Books",
               "type": "url",
               "url": "https://www.amazon.com/dp/0860918602/"
            }, {
               "date_added": "13171672754594888",
               "guid": "9a1314f6-84ca-44e5-8efa-29f51102b87f",
               "id": "1094",
               "meta_info": {
                  "last_visited_desktop": "13171672754637003"
               },
               "name": "Different: Escaping the Competitive Herd: Youngme Moon: 8601400553657: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Different-Escaping-Competitive-Youngme-Moon/dp/030746086X"
            }, {
               "date_added": "13172214634055801",
               "guid": "2b6b95e8-46da-40ba-a28d-e0baa6d3163c",
               "id": "1095",
               "meta_info": {
                  "last_visited_desktop": "13172214634116036"
               },
               "name": "(Judea Pearl)The Book of Why: The New Science of Cause and Effect: Judea Pearl, Dana Mackenzie: 9780465097609: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Book-Why-Science-Cause-Effect/dp/046509760X"
            }, {
               "date_added": "13172976080276440",
               "guid": "e33e6490-ceaf-417a-94e6-c6ca9d420b4d",
               "id": "1101",
               "meta_info": {
                  "last_visited_desktop": "13172976080284201"
               },
               "name": "Amazon.com: Images of Organization (8601200540642): Gareth Morgan: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/gp/product/1412939798?ie=UTF8&tag=ribbonfarmcom-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1412939798#customerReviews"
            }, {
               "date_added": "13173323854976601",
               "guid": "e4436f28-1f1f-48f3-ac94-c58fab9af651",
               "id": "1522",
               "meta_info": {
                  "last_visited_desktop": "13173323854991458"
               },
               "name": "Build APIs You Won't… Phil Sturgeon 著 [Leanpub PDF/iPad/Kindle]",
               "type": "url",
               "url": "https://leanpub.com/build-apis-you-wont-hate"
            }, {
               "date_added": "13173347760170392",
               "guid": "a7035e94-6ecd-4a8a-bfff-94ddc034a331",
               "id": "1109",
               "meta_info": {
                  "last_visited_desktop": "13173347760179730"
               },
               "name": "Amazon.com: The Histories (Oxford World's Classics) (8601405661029): Polybius, Robin Waterfield, Brian McGing: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Histories-Oxford-Worlds-Classics/dp/0199534705/"
            }, {
               "date_added": "13176599486823403",
               "guid": "43b27a8b-5a24-4c71-b538-c882451f273f",
               "id": "1120",
               "meta_info": {
                  "last_visited_desktop": "13176599486844327"
               },
               "name": "Division Algebras, Lattices, Physics, Windmill Tilting: Dr Geoffrey M Dixon: 9781463730802: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Division-Algebras-Lattices-Physics-Windmill/dp/1463730802#customerReviews"
            }, {
               "date_added": "13176693653513196",
               "guid": "98e783df-1cae-4a23-b594-5119e2c04c3d",
               "id": "1121",
               "meta_info": {
                  "last_visited_desktop": "13176693653525862"
               },
               "name": "Category Theory in Context (Aurora: Dover Modern Math Originals): Emily Riehl: 0800759809035: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Category-Theory-Context-Aurora-Originals/dp/048680903X/ref=cm_cr_arp_d_product_top?ie=UTF8"
            }, {
               "date_added": "13176711341167317",
               "guid": "9ad0d7bc-c57f-41a6-b284-c6b0ec63b113",
               "id": "1122",
               "meta_info": {
                  "last_visited_desktop": "13176711341183552"
               },
               "name": "Category Theory for the Sciences (The MIT Press): David I. Spivak: 9780262028134: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Category-Theory-Sciences-MIT-Press/dp/0262028131/ref=sr_1_1?ie=UTF8&qid=1532218146&sr=8-1&keywords=category+theory+for+the+sciences"
            }, {
               "date_added": "13176729262314781",
               "guid": "521ffe8b-a35e-44be-9812-e243b06cca18",
               "id": "1123",
               "meta_info": {
                  "last_visited_desktop": "13176729262319320"
               },
               "name": "An Epsilon of Room Real Analysis: Pages from Year Three of a Mathematical Blog (Graduate Studies in Mathematics): Terence Tao: 9780821852781: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Epsilon-Room-Real-Analysis-Mathematical/dp/0821852787/ref=sr_1_1?ie=UTF8&qid=1532255562&sr=8-1&keywords=an+epsilon+of+room#customerReviews"
            }, {
               "date_added": "13176941287958693",
               "guid": "ec66f029-136d-4d33-a0be-7f33d7389e65",
               "id": "1124",
               "meta_info": {
                  "last_visited_desktop": "13176945326979390"
               },
               "name": "Amazon.com: The Undoing Project: A Friendship That Changed Our Minds (9780393354775): Michael Lewis: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Undoing-Project-Friendship-Changed-Minds/dp/0393354776"
            }, {
               "date_added": "13176951849276006",
               "guid": "1eedc05b-e961-40c8-b398-62452bde295e",
               "id": "1127",
               "meta_info": {
                  "last_visited_desktop": "13176951849289785"
               },
               "name": "Mind of Napoleon: A Selection of His Written and Spoken Words: Napoleon, J. Christopher Herold: 9780231085236: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Mind-Napoleon-Selection-Written-Spoken/dp/0231085230"
            }, {
               "date_added": "13177131519354574",
               "guid": "5d48bc5a-7b67-469b-a7ed-b05705d9e672",
               "id": "1129",
               "meta_info": {
                  "last_visited_desktop": "13177131519374076"
               },
               "name": "Introduction to Electrodynamics (3rd Edition): David J. Griffiths: 9780138053260: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Introduction-Electrodynamics-3rd-David-Griffiths/dp/013805326X/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0321928423&linkCode=as2&tag=lesswrong-20#customerReviews"
            }, {
               "date_added": "13177131717709591",
               "guid": "1fce639c-803e-4bf1-9d66-d4d0c5fc40a7",
               "id": "1130",
               "meta_info": {
                  "last_visited_desktop": "13177131717713554"
               },
               "name": "Electricity and Magnetism: Edward Purcell: 9781107013605: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Electricity-Magnetism-Edward-Purcell/dp/1107013607/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0321928423&linkCode=as2&tag=lesswrong-20#customerReviews"
            }, {
               "date_added": "13177132954584076",
               "guid": "a9f5831e-5648-407e-a6cc-b0002b92f362",
               "id": "1131",
               "meta_info": {
                  "last_visited_desktop": "13177132954598345"
               },
               "name": "(Strang) Introduction to Applied Mathematics",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Introduction-Applied-Mathematics-Gilbert-Strang/dp/0961408804/ref=sr_1_2?ie=UTF8&qid=1532656854&sr=8-2&keywords=introduction+to+applied+mathematics#customerReviews"
            }, {
               "date_added": "13177134770201676",
               "guid": "40338257-7398-4900-b53e-65bdc887ea1c",
               "id": "1132",
               "meta_info": {
                  "last_visited_desktop": "13177134770217851"
               },
               "name": "Mechanics: Volume 1 (Course of Theoretical Physics S): L D Landau, E.M. Lifshitz: 9780750628969: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Mechanics-Course-Theoretical-Physics-Landau/dp/0750628960/ref=sr_1_1?ie=UTF8&qid=1532657286&sr=8-1&keywords=Classical+Mechanics%3A+Landau+and+Lifshitz#customerReviews"
            }, {
               "date_added": "13177546314461259",
               "guid": "9b24bfc8-0fa3-461d-80dd-5ee1ffaaa5ea",
               "id": "1136",
               "meta_info": {
                  "last_visited_desktop": "13177546314517179"
               },
               "name": "How to Design Programs: An Introduction to Programming and Computing (The MIT Press): Matthias Felleisen, Robert Bruce Findler, Matthew Flatt, Shriram Krishnamurthi: 9780262534802: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/How-Design-Programs-Introduction-Programming/dp/0262534800/ref=sr_1_1?ie=UTF8&qid=1533072032&sr=8-1&keywords=How+To+Design+Programs#customerReviews"
            }, {
               "date_added": "13177681889069189",
               "guid": "37ccfc2b-7742-4e8d-8a1c-24ec257bdf58",
               "id": "1137",
               "meta_info": {
                  "last_visited_desktop": "13177681889081212"
               },
               "name": "Bad Blood: Secrets and Lies in a Silicon Valley Startup: John Carreyrou: 9781524731656: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Bad-Blood-Secrets-Silicon-Startup/dp/152473165X/"
            }, {
               "date_added": "13177740337753533",
               "guid": "d9cf751d-9c93-4e3c-a72f-1f8ca9d190ef",
               "id": "1138",
               "meta_info": {
                  "last_visited_desktop": "13177740337766873"
               },
               "name": "Experimental Capitalism: The Nanoeconomics of American High-Tech Industries (The Kauffman Foundation Series on Innovation and Entrepreneurship): Steven Klepper, Serguey Braguinsky, David A. Hounshell, John H. Miller: 9780691169620: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Experimental-Capitalism-Nanoeconomics-Industries-Entrepreneurship/dp/0691169624/ref=sr_1_1?ie=UTF8&qid=1533266593&sr=8-1&keywords=Experimental+Capitalism"
            }, {
               "date_added": "13177740698692726",
               "guid": "01a35096-21d9-40a1-8272-fd21575dee53",
               "id": "1139",
               "meta_info": {
                  "last_visited_desktop": "13177740698696257"
               },
               "name": "The Invention of Enterprise: Entrepreneurship from Ancient Mesopotamia to Modern Times (The Kauffman Foundation Series on Innovation and Entrepreneurship): David S. Landes, Joel Mokyr, William J. Baumol: 9780691154527: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Invention-Enterprise-Entrepreneurship-Mesopotamia-Foundation/dp/069115452X/ref=sr_1_1?ie=UTF8&qid=1533267025&sr=8-1&keywords=The+Invention+of+Enterprise+Entrepreneurship+from+Ancient+Mesopotamia+to+Modern+Times#customerReviews"
            }, {
               "date_added": "13177820256960213",
               "guid": "5c9eb3df-bdc8-4702-a9ea-83506726de98",
               "id": "1145",
               "meta_info": {
                  "last_visited_desktop": "13177820256976943"
               },
               "name": "Start Small, Stay Small: A Developer's Guide to Launching a Startup: Rob Walling, Mike Taber: 9780615373966: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/0615373968?tag=sivers-20#customerReviews"
            }, {
               "date_added": "13178405224184970",
               "guid": "9f50674b-edab-406f-9421-a9d8db2c93fc",
               "id": "1147",
               "meta_info": {
                  "last_visited_desktop": "13178405224242720"
               },
               "name": "Gravitation, Charles W. Misner, Kip S. Thorne, John Archibald Wheeler, David I. Kaiser - Amazon.com",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Gravitation-Charles-W-Misner-ebook/dp/B0746TC525/ref=cm_cr_arp_d_product_top?ie=UTF8"
            }, {
               "date_added": "13178499880298353",
               "guid": "62ddbb9f-73ed-42bd-9496-787fc8315f0d",
               "id": "1148",
               "meta_info": {
                  "last_visited_desktop": "13178499880314494"
               },
               "name": "Dear Cyborgs: A Novel: Eugene Lim: 9780374537111: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Dear-Cyborgs-Novel-Eugene-Lim/dp/0374537119/ref=cm_cr_arp_d_product_top?ie=UTF8"
            }, {
               "date_added": "13179007994705458",
               "guid": "5484a183-e1c1-48c2-884e-591c54922a7a",
               "id": "1149",
               "meta_info": {
                  "last_visited_desktop": "13179007994755048"
               },
               "name": "Our Mathematical Universe: My Quest for the Ultimate Nature of Reality: Max Tegmark: 9780307744258: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Our-Mathematical-Universe-Ultimate-Reality/dp/0307744256/"
            }, {
               "date_added": "13179008257158910",
               "guid": "6dfecc4c-c4ea-4012-a5e5-88521552199d",
               "id": "1150",
               "meta_info": {
                  "last_visited_desktop": "13179008257175269"
               },
               "name": "Bruce Lee Striking Thoughts: Bruce Lee's Wisdom for Daily Living (Bruce Lee Library) (0676251834710): Bruce Lee, John Little: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Bruce-Lee-Striking-Thoughts-Library/dp/0804834717/?tag=offsitoftimfe-20#customerReviews"
            }, {
               "date_added": "13179008515303780",
               "guid": "4880a04f-4a95-4246-b4c3-652cde9b3f47",
               "id": "1151",
               "meta_info": {
                  "last_visited_desktop": "13179008515320942"
               },
               "name": "Getting to Yes: Negotiating Agreement Without Giving In: Roger Fisher, William L. Ury, Bruce Patton: 8601410058500: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/exec/obidos/ASIN/0140157352/ref=nosim/joelonsoftware#customerReviews"
            }, {
               "date_added": "13179009522659307",
               "guid": "9eebbc13-c120-4d02-90e3-b7c4456d417e",
               "id": "1152",
               "meta_info": {
                  "last_visited_desktop": "13179009522668977"
               },
               "name": "Envisioning Information (9780961392116): Edward R. Tufte: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/0961392118/?tag=codihorr-20#customerReviews"
            }, {
               "date_added": "13179009539958991",
               "guid": "9f90e3bf-796e-4255-bcf7-72207b5bf091",
               "id": "1153",
               "meta_info": {
                  "last_visited_desktop": "13179009539964387"
               },
               "name": "Envisioning Information: Edward R. Tufte: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/0961392118/"
            }, {
               "date_added": "13179372674647291",
               "guid": "6ebc014e-9be2-40a4-925c-53fea662cb05",
               "id": "1532",
               "meta_info": {
                  "last_visited_desktop": "13179372674727778"
               },
               "name": "Thinking Functionally with Haskell: Richard Bird: 9781107452640: Amazon.com: Books",
               "type": "url",
               "url": "https://www.amazon.com/Thinking-Functionally-Haskell-Richard-Bird/dp/1107452643/"
            }, {
               "date_added": "13179448124025693",
               "guid": "4d7ce055-db80-47c6-a101-84447c7a216f",
               "id": "1172",
               "meta_info": {
                  "last_visited_desktop": "13179448124029547"
               },
               "name": "The Haskell School of Expression: Learning Functional Programming through Multimedia: Paul Hudak: 9780521644082: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Haskell-School-Expression-Functional-Programming/dp/0521644089"
            }, {
               "date_added": "13180402892718845",
               "guid": "84a669f1-3b02-427e-bcbf-31834986d092",
               "id": "1176",
               "meta_info": {
                  "last_visited_desktop": "13180402892729637"
               },
               "name": "Feynman's Rainbow: A Search for Beauty in Physics and in Life: Leonard Mlodinow: 9780307946492: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Feynmans-Rainbow-Search-Beauty-Physics/dp/0307946495"
            }, {
               "date_added": "13181034409547937",
               "guid": "50c02686-fcd0-4dc2-b77f-cf3a79aaf128",
               "id": "1181",
               "meta_info": {
                  "last_visited_desktop": "13181034409571480"
               },
               "name": "Who Is Alexander Grothendieck? Part 1: Anarchy: Winfried Scharlau: 9783842340923: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Who-Alexander-Grothendieck-Part-Anarchy/dp/3842340923"
            }, {
               "date_added": "13181104224696756",
               "guid": "4cf52acc-e2d6-43e1-8889-abaf23bb99ab",
               "id": "1182",
               "meta_info": {
                  "last_visited_desktop": "13181104224751384"
               },
               "name": "A History of Abstract Algebra: From Algebraic Equations to Modern Algebra (Springer Undergraduate Mathematics Series): Jeremy Gray: 9783319947723: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/History-Abstract-Algebra-Undergraduate-Mathematics/dp/3319947729/ref=sr_1_1?ie=UTF8&qid=1536629184&sr=8-1&keywords=A+History+of+Abstract+Algebra"
            }, {
               "date_added": "13181697634956919",
               "guid": "ed323c51-6c4a-416f-af78-f4674f92ef03",
               "id": "1187",
               "meta_info": {
                  "last_visited_desktop": "13181697635019061"
               },
               "name": "Amazon.com: The Penguin Book of Japanese Short Stories (A Penguin Classics Hardcover) (9780141395623): Jay Rubin, Haruki Murakami: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Penguin-Japanese-Stories-Classics-Hardcover/dp/0141395621/ref=sr_1_1?ie=UTF8&qid=1537223911&sr=8-1&keywords=the+penguin+book+of+japanese+short+stories#customerReviews"
            }, {
               "date_added": "13182129379146143",
               "guid": "84327a2d-9b99-4bb1-8b30-37aee16ec9b7",
               "id": "1188",
               "meta_info": {
                  "last_visited_desktop": "13182129379294046"
               },
               "name": "A Philosophy of Software Design: John Ousterhout: 9781732102200: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Philosophy-Software-Design-John-Ousterhout/dp/1732102201/ref=pd_sbs_14_1?_encoding=UTF8&pd_rd_i=1732102201&pd_rd_r=4dc293d4-beb7-11e8-b3a9-1f5f95d9d540&pd_rd_w=joBVg&pd_rd_wg=VQjiK&pf_rd_i=desktop-dp-sims&pf_rd_m=ATVPDKIKX0DER&pf_rd_p=53dead45-2b3d-4b73-bafb-fe26a7f14aac&pf_rd_r=A8HGD0YEDMEPMA8EDJ67&pf_rd_s=desktop-dp-sims&pf_rd_t=40701&psc=1&refRID=A8HGD0YEDMEPMA8EDJ67"
            }, {
               "date_added": "13182393472558158",
               "guid": "7ebdfb55-78a3-49c1-a776-30a7f5fc4e38",
               "id": "1189",
               "meta_info": {
                  "last_visited_desktop": "13182393472739726"
               },
               "name": "Amazon.com: A World Apart: Imprisonment in a Soviet Labor Camp During World War II (9780140251845): Gustaw Herling, Andrzej Ciolkosz, Bertrand Russell: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/World-Apart-Imprisonment-Soviet-During/dp/0140251847"
            }, {
               "date_added": "13182742637922230",
               "guid": "cb1048cd-f04a-41b1-9da7-0361068834da",
               "id": "1195",
               "meta_info": {
                  "last_visited_desktop": "13182742637932030"
               },
               "name": "The Open World: Hermann Weyl: 9780918024701: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Open-World-Hermann-Weyl-dp-0918024706/dp/0918024706"
            }, {
               "date_added": "13182742819484438",
               "guid": "fd7a05cb-eb72-42f1-9582-bd8a18d468d9",
               "id": "1196",
               "meta_info": {
                  "last_visited_desktop": "13182742819488472"
               },
               "name": "(Weyl) Mind and Nature: Selected Writings on Philosophy, Mathematics, and Physics: Hermann Weyl, Peter Pesic: 9780691135458: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Mind-Nature-Selected-Philosophy-Mathematics/dp/0691135452/"
            }, {
               "date_added": "13182908225823350",
               "guid": "62af5b49-7ee3-48e3-b472-ef4a49922688",
               "id": "1197",
               "meta_info": {
                  "last_visited_desktop": "13182908225824509"
               },
               "name": "Pattern Theory: The Stochastic Analysis of Real-World Signals (Applying Mathematics) (9781568815794): David Mumford, Agnès Desolneux: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/1568815794/"
            }, {
               "date_added": "13182908810322062",
               "guid": "7830862d-04c7-4ab0-b0fc-928d55faf1b2",
               "id": "1198",
               "meta_info": {
                  "last_visited_desktop": "13182908810324399"
               },
               "name": "Amazon.com: Three-Dimensional Geometry and Topology, Vol. 1 (9780691083049): William P. Thurston, Silvio Levy: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Three-Dimensional-Geometry-Topology-William-Thurston/dp/0691083045"
            }, {
               "date_added": "13182909221269244",
               "guid": "cfe5a588-df67-41a0-93bd-2627d6dc79f9",
               "id": "1199",
               "meta_info": {
                  "last_visited_desktop": "13182909221270016"
               },
               "name": "Indra's Pearls: The Vision of Felix Klein: David Mumford, Caroline Series, David Wright: 9780521352536: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Indras-Pearls-Vision-Felix-Klein/dp/0521352533"
            }, {
               "date_added": "13182911118150271",
               "guid": "559cd9d9-5493-4af8-aede-ed6d2b26999d",
               "id": "1200",
               "meta_info": {
                  "last_visited_desktop": "13182911118151363"
               },
               "name": "Amazon.com: The Unreal Life of Oscar Zariski (9780387094298): Carol Parikh: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Unreal-Life-Oscar-Zariski-dp-0387094296/dp/0387094296"
            }, {
               "date_added": "13182911229792410",
               "guid": "cdd8765c-47ce-48e5-86a6-3564aa30a54f",
               "id": "1201",
               "meta_info": {
                  "last_visited_desktop": "13182911229793133"
               },
               "name": "A3 & His Algebra: How a Boy from Chicago's West Side Became a Force in American Mathematics: Nancy Albert: 9780595328178: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/A3-His-Algebra-Chicagos-Mathematics/dp/0595328172"
            }, {
               "date_added": "13183613101615617",
               "guid": "cba98631-ca92-48d5-a2db-0c829d658817",
               "id": "1203",
               "meta_info": {
                  "last_visited_desktop": "13183613101627279"
               },
               "name": "Mathematical Models of Financial Derivatives (Springer Finance) (9783540422884): Yue-Kuen Kwok: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Mathematical-Financial-Derivatives-Springer-Finance/dp/3540422889"
            }, {
               "date_added": "13183618379584725",
               "guid": "0b86d384-4bee-44a7-b2bd-b8710188a626",
               "id": "1207",
               "meta_info": {
                  "last_visited_desktop": "13183618379594410"
               },
               "name": "People, Problems, and Proofs: Essays from Gödel's Lost Letter: 2010: Richard J. Lipton, Kenneth W. Regan: 9783642414213: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/People-Problems-Proofs-Essays-G%C3%B6dels/dp/3642414214#customerReviews"
            }, {
               "date_added": "13183619503348349",
               "guid": "8a15eca6-3c6f-4607-b003-a1200cfc8c1e",
               "id": "1531",
               "meta_info": {
                  "last_visited_desktop": "13183619503349156"
               },
               "name": "Clause and Effect: Prolog Programming for the Working Programmer: William F. Clocksin: 9783540652373: Amazon.com: Books",
               "type": "url",
               "url": "https://www.amazon.com/Clause-Effect-Programming-Working-Programmer/dp/3540629718"
            }, {
               "date_added": "13183694588038771",
               "guid": "d2209c5a-f211-42df-bbb2-5dee3a1f62e6",
               "id": "1211",
               "meta_info": {
                  "last_visited_desktop": "13202259962904194"
               },
               "name": "(Penrose) Fashion, Faith, and Fantasy in the New Physics of the Universe, Roger Penrose - Amazon.com",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Fashion-Faith-Fantasy-Physics-Universe-ebook/dp/B01AMPQTRU"
            }, {
               "date_added": "13184185699221951",
               "guid": "b9dfba82-204b-461e-b96f-b208b93e4230",
               "id": "1216",
               "meta_info": {
                  "last_visited_desktop": "13184185699222765"
               },
               "name": "On Intelligence: How a New Understanding of the Brain Will Lead to the Creation of Truly Intelligent Machines: Jeff Hawkins, Sandra Blakeslee: 9780805078534: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Intelligence-Understanding-Creation-Intelligent-Machines-dp-0805078533/dp/0805078533"
            }, {
               "date_added": "13184217943140761",
               "guid": "b8b9dc38-334d-43c4-9a30-9b4ef8c39ed6",
               "id": "1218",
               "meta_info": {
                  "last_visited_desktop": "13184217943142333"
               },
               "name": "Superintelligence: Paths, Dangers, Strategies: Nick Bostrom: 9780198739838: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Superintelligence-Dangers-Strategies-Nick-Bostrom/dp/0198739834/ref=wsixn__1?_encoding=UTF8&pd_rd_i=0198739834&pd_rd_r=ed87b67e-d1b5-11e8-b2b1-635e08f8ca97&pd_rd_w=LBt4h&pd_rd_wg=GsujR&pf_rd_i=desktop-dp-sims&pf_rd_m=ATVPDKIKX0DER&pf_rd_p=db2a86b0-50ce-4c4d-9de0-17d41820d24e&pf_rd_r=WBZ86XFB8431J221ETJ3&pf_rd_s=desktop-dp-sims&pf_rd_t=40701&psc=1&refRID=WBZ86XFB8431J221ETJ3"
            }, {
               "date_added": "13184304847278459",
               "guid": "e283bcb2-2959-4843-bfbd-4249b54ed14c",
               "id": "1219",
               "meta_info": {
                  "last_visited_desktop": "13184304847288175"
               },
               "name": "(Rorty) Contingency, Irony, and Solidarity: Richard Rorty: 9780521367813: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Contingency-Irony-Solidarity-Richard-Rorty/dp/0521367816"
            }, {
               "date_added": "13184540026495071",
               "guid": "0e2a2aa8-4591-41a7-bd92-68d30f667b24",
               "id": "1221",
               "meta_info": {
                  "last_visited_desktop": "13184540026496190"
               },
               "name": "Differential Forms: Theory and Practice: Steven H. Weintraub: 9780123944030: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Differential-Forms-Practice-Steven-Weintraub/dp/0123944031?keywords=stokes%27+theorem&qid=1540066050&sr=8-16&ref=sr_1_16"
            }, {
               "date_added": "13184626196780604",
               "guid": "35d7556b-9637-4dc1-b42e-d876e7016727",
               "id": "1222",
               "meta_info": {
                  "last_visited_desktop": "13184626196781715"
               },
               "name": "Haunted Castles: The Complete Gothic Stories (Penguin Horror): Ray Russell, Guillermo Del Toro: 9780143124016: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Haunted-Castles-Complete-Stories-Penguin/dp/0143124013/"
            }, {
               "date_added": "13184725068362980",
               "guid": "c555eee2-daf3-4132-b832-ec4773398bc1",
               "id": "1223",
               "meta_info": {
                  "last_visited_desktop": "13184725068364464"
               },
               "name": "Amazon: The Epic History Of Biology",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Epic-History-Biology-Anthony-Serafini/dp/073820577X/ref=sr_1_2?ie=UTF8&qid=1540247014&sr=8-2&keywords=history+of+biology"
            }, {
               "date_added": "13184726565910416",
               "guid": "2e491197-1314-4715-b3be-eb1d8bf08d1c",
               "id": "1224",
               "meta_info": {
                  "last_visited_desktop": "13184726565911261"
               },
               "name": "The Eighth Day of Creation: Makers of the Revolution in Biology, Commemorative Edition: 8601409785448: Medicine & Health Science Books @ Amazon.com",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Eighth-Day-Creation-Revolution-Commemorative/dp/0879694785?keywords=8th+day+of+creation&qid=1540251246&sr=8-1&ref=sr_1_1#customerReviews"
            }, {
               "date_added": "13184726581070568",
               "guid": "e00ca34c-c1d9-4f46-b0f1-a2ae5efe1470",
               "id": "1225",
               "meta_info": {
                  "last_visited_desktop": "13184726581071410"
               },
               "name": "The Eighth Day of Creation: Makers of the Revolution in Biology, Commemorative Edition: 8601409785448: Medicine & Health Science Books @ Amazon.com",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Eighth-Day-Creation-Revolution-Commemorative/dp/0879694785"
            }, {
               "date_added": "13185060569349183",
               "guid": "18d0d07f-73d7-4240-baa8-823b7f7c5b85",
               "id": "1229",
               "meta_info": {
                  "last_visited_desktop": "13185060569355130"
               },
               "name": "More Precisely: The Math You Need to Do Philosophy (Broadview Guides to Philosophy) (9781551119090): Eric Steinhart: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/More-Precisely-The-Math-You-Need-to-Do-Philosophy/dp/1551119099/"
            }, {
               "date_added": "13185060583300520",
               "guid": "19747625-26ac-4f23-b5fc-be781861d684",
               "id": "1230",
               "meta_info": {
                  "last_visited_desktop": "13185060583311900"
               },
               "name": "The Oxford Handbook of Philosophy of Mathematics and Logic (Oxford Handbooks) (9780195325928): Stewart Shapiro: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Oxford-Handbook-Philosophy-Mathematics-Handbooks/dp/0195325923"
            }, {
               "date_added": "13185314752915659",
               "guid": "348b7fc9-26cb-41b6-9dbe-bf60902508ad",
               "id": "1231",
               "meta_info": {
                  "last_visited_desktop": "13185314752931825"
               },
               "name": "Automata Theory: Matthew Simon: 9789810237530: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Automata-Theory-Matthew-Simon/dp/9810237537"
            }, {
               "date_added": "13185315873697225",
               "guid": "9adb5cd5-2f2f-48c7-a87f-c64aada9d8e5",
               "id": "1232",
               "meta_info": {
                  "last_visited_desktop": "13185315873698201"
               },
               "name": "Street-Fighting Mathematics: The Art of Educated Guessing and Opportunistic Problem Solving (The MIT Press): Sanjoy Mahajan, Carver A Mead: 9780262514293: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Street-Fighting-Mathematics-Educated-Guessing-Opportunistic/dp/026251429X/"
            }, {
               "date_added": "13185766626834638",
               "guid": "3b82bb84-c143-4483-96ca-0a4ef308b073",
               "id": "1234",
               "meta_info": {
                  "last_visited_desktop": "13186974618538828"
               },
               "name": "Foundations of Physically Based Modeling and Animation: 9781482234602: Computer Science Books @ Amazon.com",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Foundations-Physically-Based-Modeling-Animation/dp/1482234602/"
            }, {
               "date_added": "13185778323980255",
               "guid": "42457869-55a6-4fc8-b95a-b3f8f0534116",
               "id": "1235",
               "meta_info": {
                  "last_visited_desktop": "13185778323981810"
               },
               "name": "Insatiability: Stanislaw Ignacy Witkiewicz, Louis Iribarne: 9780810111349: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Insatiability-Stanislaw-Ignacy-Witkiewicz/dp/0810111349/"
            }, {
               "date_added": "13185850796716899",
               "guid": "4e7a20cd-d972-42dd-9fe1-685aa9c6bcd3",
               "id": "1236",
               "meta_info": {
                  "last_visited_desktop": "13185850796721548"
               },
               "name": "(Mach) The Science of Mechanics: A Critical and Historical Exposition of its Principles (Cambridge Library Collection - Physical Sciences) (9781108066488): Ernst Mach, Thomas J. McCormack: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Science-Mechanics-Historical-Exposition-Principles/dp/1108066488"
            }, {
               "date_added": "13185855516919156",
               "guid": "4c896b5a-cb10-42b9-8953-8c0792e13e2f",
               "id": "1237",
               "meta_info": {
                  "last_visited_desktop": "13185855516920610"
               },
               "name": "Amazon.com: The Blind Owl (Authorized by The Sadegh Hedayat Foundation - First Translation into English Based on the Bombay Edition) eBook: Sadegh Hedayat, Naveed Noori: Kindle Store",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Blind-Authorized-Sadegh-Hedayat-Foundation-ebook/dp/B009UZU6E6"
            }, {
               "date_added": "13185856148456550",
               "guid": "1fd6fae3-5ebf-4ef7-84e6-c70e987e6438",
               "id": "1238",
               "meta_info": {
                  "last_visited_desktop": "13185856148457601"
               },
               "name": "On Elegance While Sleeping (Argentinian Literature Series): Emilio Lascano Tegui, Idra Novey, Celina Manzoni: 9781564786043: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Elegance-While-Sleeping-Argentinian-Literature/dp/1564786048"
            }, {
               "date_added": "13185856190339067",
               "guid": "b1deeaf5-d3ad-4621-bf8f-df5f2e018d47",
               "id": "1239",
               "meta_info": {
                  "last_visited_desktop": "13185856190339992"
               },
               "name": "Amazon.com: The Buddha's Return (Pushkin Collection) (9781782270591): Gaito Gazdanov, Bryan Karetnyk: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Buddhas-Return-Pushkin-Collection/dp/1782270590/ref=pd_sim_14_3?_encoding=UTF8&pd_rd_i=1782270590&pd_rd_r=f1a17604-dfe7-11e8-ba09-5164c5d489d6&pd_rd_w=m7RYT&pd_rd_wg=fiG5Z&pf_rd_i=desktop-dp-sims&pf_rd_m=ATVPDKIKX0DER&pf_rd_p=18bb0b78-4200-49b9-ac91-f141d61a1780&pf_rd_r=ZTMV6KR4905J1DBX26KR&pf_rd_s=desktop-dp-sims&pf_rd_t=40701&psc=1&refRID=ZTMV6KR4905J1DBX26KR"
            }, {
               "date_added": "13185856205542512",
               "guid": "af140a0d-75a6-4aaf-b806-fb51197cb77d",
               "id": "1240",
               "meta_info": {
                  "last_visited_desktop": "13185856205543345"
               },
               "name": "The Buddha's Return (Pushkin Collection) (9781782270591): Gaito Gazdanov, Bryan Karetnyk: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Buddhas-Return-Pushkin-Collection/dp/1782270590"
            }, {
               "date_added": "13186013391536233",
               "guid": "68112481-f708-4f99-bce0-498e20c87df1",
               "id": "1244",
               "meta_info": {
                  "last_visited_desktop": "13186013391540036"
               },
               "name": "The Elephant in the Brain: Hidden Motives in Everyday Life: Kevin Simler, Robin Hanson: 9780190495992: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Elephant-Brain-Hidden-Motives-Everyday/dp/0190495995"
            }, {
               "date_added": "13186883670521505",
               "guid": "c29a7011-6849-48ee-9ba6-146d0fdf8637",
               "id": "1246",
               "meta_info": {
                  "last_visited_desktop": "13186883670530526"
               },
               "name": "Amazon.com: Who Is Michael Ovitz? (9781591845546): Michael Ovitz: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Who-Michael-Ovitz/dp/1591845548/"
            }, {
               "date_added": "13186883781125397",
               "guid": "9066a453-fdfa-4b8a-bbd3-43890ee48470",
               "id": "1247",
               "meta_info": {
                  "last_visited_desktop": "13187266176534862"
               },
               "name": "Father, Son & Co.: My Life at IBM and Beyond: Thomas J. Watson, Peter Petre: 9780553380835: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Father-Son-Co-Life-Beyond/dp/0553380834"
            }, {
               "date_added": "13187266420845239",
               "guid": "2cc2f3cf-ac89-4df4-bb7e-7a6fce2cdf48",
               "id": "1249",
               "meta_info": {
                  "last_visited_desktop": "13187266420846352"
               },
               "name": "Salt, Fat, Acid, Heat: Mastering the Elements of Good Cooking: Samin Nosrat, Wendy MacNaughton: 9781476753836: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Salt-Fat-Acid-Heat-Mastering/dp/1476753830/"
            }, {
               "date_added": "13187273470213565",
               "guid": "bd45b15e-ca3b-4efa-bb38-0b410bf36aaf",
               "id": "1250",
               "meta_info": {
                  "last_visited_desktop": "13187273470214357"
               },
               "name": "Natural Philosophy Of Cause And Chance: Max Born: 9781376185119: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Natural-Philosophy-Cause-Chance-Born/dp/1376185113/"
            }, {
               "date_added": "13187660453008213",
               "guid": "d0f77ec4-3409-47b7-a526-1200ddc9d247",
               "id": "1251",
               "meta_info": {
                  "last_visited_desktop": "13187660453018557"
               },
               "name": "Amazon.com: An Illustrated Theory of Numbers (9781470434939): Martin H. Weissman: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Illustrated-Theory-Numbers-Martin-Weissman/dp/1470434938"
            }, {
               "date_added": "13187665936748602",
               "guid": "a60f6e92-411c-437d-9be3-77707f3d39ba",
               "id": "1252",
               "meta_info": {
                  "last_visited_desktop": "13202259969442334"
               },
               "name": "(very interesting) The Reign of Relativity: Philosophy in Physics 1915-1925 (Oxford Studies in the Philosophy of Science) (9780195320183): Thomas Ryckman: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Reign-Relativity-Philosophy-Physics-1915-1925/dp/0195320182/"
            }, {
               "date_added": "13187666247104858",
               "guid": "a7ffb86d-575a-4c19-b25c-026251f82795",
               "id": "1253",
               "meta_info": {
                  "last_visited_desktop": "13187666247105589"
               },
               "name": "Amazon.com: Categories for the Working Philosopher (9780198748991): Elaine Landry: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Categories-Working-Philosopher-Elaine-Landry/dp/019874899X"
            }, {
               "date_added": "13187668904865919",
               "guid": "6e49d1be-01d2-4fed-a42e-a5e0a64e3c46",
               "id": "1254",
               "meta_info": {
                  "last_visited_desktop": "13187668904866931"
               },
               "name": "Amazon.com: Geometry of Complex Numbers (Dover Books on Mathematics) (9780486638300): Hans Schwerdtfeger: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Geometry-Complex-Numbers-Dover-Mathematics/dp/0486638308"
            }, {
               "date_added": "13187669211239250",
               "guid": "a31f34a6-6349-4a6c-a3e4-a512893aa50c",
               "id": "1255",
               "meta_info": {
                  "last_visited_desktop": "13187669218358232"
               },
               "name": "Einstein Gravity in a Nutshell: A. Zee: 9780691145587: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Einstein-Gravity-Nutshell-Zee/dp/069114558X?SubscriptionId=AKIAIJKR6IY4BV5FKK7A&tag=wwwyasivcom-20&linkCode=xm2&camp=2025&creative=165953&creativeASIN=069114558X#customerReviews"
            }, {
               "date_added": "13187672081059514",
               "guid": "3b3c9981-a682-438d-8af3-9485e047bece",
               "id": "1256",
               "meta_info": {
                  "last_visited_desktop": "13187672081060822"
               },
               "name": "Eichmann in Jerusalem: A Report on the Banality of Evil (Penguin Classics): Hannah Arendt, Amos Elon: 0783324842326: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Eichmann-Jerusalem-Banality-Penguin-Classics/dp/0143039881/"
            }, {
               "date_added": "13187672957244183",
               "guid": "48334246-0d05-46ca-8eb7-525948312b44",
               "id": "1257",
               "meta_info": {
                  "last_visited_desktop": "13187672957245412"
               },
               "name": "Poor Charlie's Almanack: The Wit and Wisdom of Charles T. Munger: Charles T. Munger, Peter D. Kaufman, Warren E. Buffett: 9781578643660: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/157864366X"
            }, {
               "date_added": "13187673145939241",
               "guid": "202d244a-7511-45c4-a0f5-bbbda2bbc0f3",
               "id": "1258",
               "meta_info": {
                  "last_visited_desktop": "13187673145940072"
               },
               "name": "Amazon.com: Nixon Agonistes: The Crisis of the Self-Made Man (9780618134328): Garry Wills: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/0618134328"
            }, {
               "date_added": "13187673492055992",
               "guid": "f2975c50-7b02-4fe5-94e0-0e0df14cc637",
               "id": "1259",
               "meta_info": {
                  "last_visited_desktop": "13187673492056902"
               },
               "name": "Amazon.com: Foucault's Pendulum By Umberto Eco: -Author-: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/B004S7XVKM"
            }, {
               "date_added": "13187674947548215",
               "guid": "328da6a9-825e-4cb7-8446-0f790f95288d",
               "id": "1260",
               "meta_info": {
                  "last_visited_desktop": "13192866875731351"
               },
               "name": "The Biological Mind: How Brain, Body, and Environment Collaborate to Make Us Who We Are: 9780465052684: Medicine & Health Science Books @ Amazon.com",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Biological-Mind-Brain-Environment-Collaborate/dp/0465052681"
            }, {
               "date_added": "13187675686903514",
               "guid": "4333b7fb-2573-48dd-b685-946c3e0cd14a",
               "id": "1515",
               "meta_info": {
                  "last_visited_desktop": "13187745980234890"
               },
               "name": "A trip through the Graphics Pipeline 2011: Index | The ryg blog",
               "type": "url",
               "url": "https://fgiesen.wordpress.com/2011/07/09/a-trip-through-the-graphics-pipeline-2011-index/"
            }, {
               "date_added": "13188094636985839",
               "guid": "ed500116-0ab9-433c-8e0d-80e968f09f3a",
               "id": "1263",
               "meta_info": {
                  "last_visited_desktop": "13188094636987228"
               },
               "name": "Information Theory: A Tutorial Introduction: James V Stone: 9780956372857: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Information-Theory-Introduction-James-Stone/dp/0956372856"
            }, {
               "date_added": "13188265021940967",
               "guid": "f55e86eb-596e-4803-a875-7178fbf8a0d3",
               "id": "1265",
               "meta_info": {
                  "last_visited_desktop": "13188265021941476"
               },
               "name": "Conceptual Mathematics: A First Introduction to Categories: F. William Lawvere: 9780521719162: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Conceptual-Mathematics-First-Introduction-Categories/dp/052171916X/"
            }, {
               "date_added": "13188949942423266",
               "guid": "07e2d26f-f362-4cab-b4cd-061e6506bcaa",
               "id": "1266",
               "meta_info": {
                  "last_visited_desktop": "13188949942425991"
               },
               "name": "More Than Life Itself: A Synthetic Continuation in Relational Biology (Categories): A. H. Louie: 9783868380446: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/More-Than-Life-Itself-Continuation/dp/3868380442"
            }, {
               "date_added": "13189118380978530",
               "guid": "adb74fbf-234b-4741-a8d8-2fdabb2f7722",
               "id": "1267",
               "meta_info": {
                  "last_visited_desktop": "13189118380980432"
               },
               "name": "The Master Algorithm: How the Quest for the Ultimate Learning Machine Will Remake Our World: Pedro Domingos: 9780465094271: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Master-Algorithm-Ultimate-Learning-Machine/dp/0465094279"
            }, {
               "date_added": "13189118585401994",
               "guid": "da6e103e-9cc7-4c69-97d6-141d319dab86",
               "id": "1268",
               "meta_info": {
                  "last_visited_desktop": "13189118585413776"
               },
               "name": "Amazon.com: Leonardo da Vinci (9781501139154): Walter Isaacson: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Leonardo-Vinci-Walter-Isaacson/dp/1501139150/ref=sr_1_2?ie=UTF8&qid=1544642012&sr=8-2&keywords=leonardo+da+vinci+isaacson"
            }, {
               "date_added": "13189118695885192",
               "guid": "58d8acaa-59f9-421b-959b-6e04912eeda3",
               "id": "1269",
               "meta_info": {
                  "last_visited_desktop": "13189118695886205"
               },
               "name": "Modern Robotics: Mechanics, Planning, and Control: Kevin M. Lynch, Frank C. Park: 0001107156300: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Modern-Robotics-Mechanics-Planning-Control/dp/1107156300/"
            }, {
               "date_added": "13189645265234596",
               "guid": "98c19168-6e2e-4aa1-adda-6c867c4a51d7",
               "id": "1271",
               "meta_info": {
                  "last_visited_desktop": "13189645265257020"
               },
               "name": "Neural Networks and Qualitative Physics: A Viability Approach: Jean-Pierre Aubin: 9780521445320: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Neural-Networks-Qualitative-Physics-Viability/dp/0521445329/"
            }, {
               "date_added": "13190337820570859",
               "guid": "d2df76a2-6019-49e5-b663-99994e012f5f",
               "id": "1272",
               "meta_info": {
                  "last_visited_desktop": "13190337820588507"
               },
               "name": "Season of the Witch: Enchantment, Terror, and Deliverance in the City of Love: David Talbot: 9781439108246: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Season-Witch-Enchantment-Terror-Deliverance/dp/1439108242/"
            }, {
               "date_added": "13190359492711496",
               "guid": "5d659d34-1334-49dc-a8a4-47fff5b6b90c",
               "id": "1274",
               "meta_info": {
                  "last_visited_desktop": "13190359492713805"
               },
               "name": "Isaac Newton and Natural Philosophy (Renaissance Lives): Niccolò Guicciardini: 9781780239064: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Isaac-Newton-Natural-Philosophy-Renaissance/dp/1780239068/"
            }, {
               "date_added": "13190361321434748",
               "guid": "e5ea2382-f354-4e84-aa4c-c1e935e6c8bc",
               "id": "1275",
               "meta_info": {
                  "last_visited_desktop": "13190361321435202"
               },
               "name": "The Righteous Mind: Why Good People Are Divided by Politics and Religion: Jonathan Haidt: 9780307455772: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Righteous-Mind-Divided-Politics-Religion/dp/0307455777"
            }, {
               "date_added": "13190518417362743",
               "guid": "b87fb1c8-e982-4f9e-9bee-cdfb25fd446e",
               "id": "1276",
               "meta_info": {
                  "last_visited_desktop": "13190518417365249"
               },
               "name": "Galois Theory, Fourth Edition: Ian Nicholas Stewart: 9781482245820: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Galois-Theory-Fourth-Nicholas-Stewart/dp/1482245825/ref=sr_1_1?ie=UTF8&qid=1546044648&sr=8-1&keywords=Ian+Stewart%2C+Galois+Theory"
            }, {
               "date_added": "13190595282612327",
               "guid": "10f36ec0-f55c-40b5-b474-a95a89537135",
               "id": "1277",
               "meta_info": {
                  "last_visited_desktop": "13190595282613004"
               },
               "name": "Amazon.com: The Science of Enlightenment: How Meditation Works (9781591794608): Shinzen Young: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Science-Enlightenment-How-Meditation-Works/dp/1591794609/"
            }, {
               "date_added": "13190683063248640",
               "guid": "7b71d447-9928-4eac-b1bb-0d3da359e9f7",
               "id": "1278",
               "meta_info": {
                  "last_visited_desktop": "13190683063249613"
               },
               "name": "Enlightened Vagabond: The Life and Teachings of Patrul Rinpoche: Matthieu Ricard, Dza Patrul Rinpoche, Constance Wilkinson: 9781611803303: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Enlightened-Vagabond-Teachings-Patrul-Rinpoche/dp/1611803306/"
            }, {
               "date_added": "13190692854615505",
               "guid": "61b87f20-7e57-4e3a-970e-170791d5e01e",
               "id": "1279",
               "meta_info": {
                  "last_visited_desktop": "13190692854616247"
               },
               "name": "Amazon.com: Against the Current: Essays in the History of Ideas - Second Edition (9780691156101): Isaiah Berlin, Henry Hardy, Roger Hausheer, Mark Lilla: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Against-Current-Essays-History-Second/dp/0691156107"
            }, {
               "date_added": "13190699757385190",
               "guid": "cd664058-a8a6-46e7-84d2-1660256ea8ec",
               "id": "1280",
               "meta_info": {
                  "last_visited_desktop": "13190699757385886"
               },
               "name": "The Mind of a Mnemonist: A Little Book about a Vast Memory, With a New Foreword by Jerome S. Bruner: 9780674576223: Medicine & Health Science Books @ Amazon.com",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Mind-Mnemonist-Little-Memory-Foreword/dp/0674576225"
            }, {
               "date_added": "13190872221211549",
               "guid": "87644435-5429-4722-a986-7216ac536b43",
               "id": "1281",
               "meta_info": {
                  "last_visited_desktop": "13190872221226308"
               },
               "name": "Democracy in America: Translated, Edited, and With an Introduction by Harvey C. Mansfield and Delba Winthrop: Alexis de Tocqueville, Harvey C. Mansfield, Delba Winthrop: 0000226805328: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Democracy-America-Translated-Introduction-Mansfield/dp/0226805328"
            }, {
               "date_added": "13190874625827118",
               "guid": "94819fee-a525-4391-bd99-e202edacca3e",
               "id": "1282",
               "meta_info": {
                  "last_visited_desktop": "13190874625830173"
               },
               "name": "Billionaire Buddha: Rivera Sun: 9780984813285: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/0984813284/"
            }, {
               "date_added": "13191112708155657",
               "guid": "e2275574-79e8-42e5-8352-652379ba46cb",
               "id": "1283",
               "meta_info": {
                  "last_visited_desktop": "13191112708187960"
               },
               "name": "Peddling Prosperity: Economic Sense and Nonsense in an Age of Diminished Expectations (Norton Paperback): Paul Krugman: 9780393312928: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Peddling-Prosperity-Diminished-Expectations-Paperback/dp/0393312925/"
            }, {
               "date_added": "13191115651883556",
               "guid": "12fa558b-69b4-4d32-b80d-a44e3b15abe1",
               "id": "1284",
               "meta_info": {
                  "last_visited_desktop": "13191115651884698"
               },
               "name": "36 Lectures in Biology (9780262620291): S. E. Luria: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/36-Lectures-Biology-S-Luria/dp/0262620294/"
            }, {
               "date_added": "13191118425262944",
               "guid": "fe82f4bf-b14f-44c0-8b9d-1dcd1b9a3e3c",
               "id": "1285",
               "meta_info": {
                  "last_visited_desktop": "13191118425264217"
               },
               "name": "How to Change Your Mind: What the New Science of Psychedelics Teaches Us About Consciousness, Dying, Addiction, Depression, and Transcendence - Kindle edition by Michael Pollan. Professional & Technical Kindle eBooks @ Amazon.com.",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/B076GPJXWZ/"
            }, {
               "date_added": "13191298888692603",
               "guid": "f9374434-3e3e-476c-b050-f9b018f47549",
               "id": "1286",
               "meta_info": {
                  "last_visited_desktop": "13191298888716908"
               },
               "name": "H. P. Lovecraft: Against the World, Against Life: Michel Houellebecq: 9780575084018: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/H-P-Lovecraft-Against-World/dp/0575084014"
            }, {
               "date_added": "13191300706605084",
               "guid": "527920fd-cc9d-4299-95fe-14c70dde4cfc",
               "id": "1287",
               "meta_info": {
                  "last_visited_desktop": "13191300706607564"
               },
               "name": "Whatever: Michel Houellebecq, Paul Hammond, Toby Litt: 9781846687846: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/gp/product/1846687845/"
            }, {
               "date_added": "13191301740819191",
               "guid": "33d406c7-a749-40a5-bb06-3def0b2459af",
               "id": "1289",
               "meta_info": {
                  "last_visited_desktop": "13191301740819848"
               },
               "name": "The Philosophical Detective - Kindle edition by Bruce Hartman. Literature & Fiction Kindle eBooks @ Amazon.com.",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Philosophical-Detective-Bruce-Hartman-ebook/dp/B00KPZDS5O"
            }, {
               "date_added": "13191376781701741",
               "guid": "c6bc8bd4-b781-481c-90b1-d56a945c7170",
               "id": "1290",
               "meta_info": {
                  "last_visited_desktop": "13191376781711913"
               },
               "name": "The Ghost in the Machine: Arthur Koestler: 9781939438348: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Ghost-Machine-Arthur-Koestler/dp/1939438349"
            }, {
               "date_added": "13191486288724259",
               "guid": "e5bb93f6-122d-4b8a-9699-1ad7bfc967ac",
               "id": "1291",
               "meta_info": {
                  "last_visited_desktop": "13191486288915618"
               },
               "name": "Amazon.com: Time Travel: A History (9780804168922): James Gleick: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Time-Travel-History-James-Gleick/dp/080416892X/"
            }, {
               "date_added": "13191892533162792",
               "guid": "01e95f93-6fba-4e01-a2a1-953f972d5c97",
               "id": "1292",
               "meta_info": {
                  "last_visited_desktop": "13191892541894648"
               },
               "name": "The Best Writing on Mathematics 2018: Mircea Pitici: 9780691182766: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Best-Writing-Mathematics-2018/dp/0691182760"
            }, {
               "date_added": "13192148702540803",
               "guid": "c361dd34-cb82-4d91-bdde-ab5c4cfa82c7",
               "id": "1518",
               "meta_info": {
                  "last_visited_desktop": "13192148702542367"
               },
               "name": "Amazon.com: Corelli's Mandolin: A Novel (9780679763970): Louis de Bernieres: Books",
               "type": "url",
               "url": "https://www.amazon.com/dp/067976397X/"
            }, {
               "date_added": "13192149212202516",
               "guid": "0c8bc989-e2f3-4a4d-937f-b4c6ebf877cc",
               "id": "1627",
               "meta_info": {
                  "last_visited_desktop": "13192149212203448"
               },
               "name": "Shadow & Claw: The First Half of 'The Book of the New Sun': Gene Wolfe: 9780312890179: Amazon.com: Books",
               "type": "url",
               "url": "https://www.amazon.com/dp/0312890176/"
            }, {
               "date_added": "13192149436436167",
               "guid": "2f5cd0d7-ee08-4a3f-8f9a-93502b8de043",
               "id": "1295",
               "meta_info": {
                  "last_visited_desktop": "13192149436436856"
               },
               "name": "Stoner (New York Review Books Classics): John Williams, John McGahern: 9781590171998: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/1590171993/"
            }, {
               "date_added": "13192149807370707",
               "guid": "a866d6ea-5e6b-40b8-a62b-c24111a8969d",
               "id": "1524",
               "meta_info": {
                  "last_visited_desktop": "13192149807371556"
               },
               "name": "Amazon.com: Shantaram: A Novel (8601401279068): Gregory David Roberts: Books",
               "type": "url",
               "url": "https://www.amazon.com/dp/0312330537/"
            }, {
               "date_added": "13192431369859878",
               "guid": "f6406087-946a-40fd-89fe-3d51785cb953",
               "id": "1297",
               "meta_info": {
                  "last_visited_desktop": "13192431369869019"
               },
               "name": "Algorithms on Trees and Graphs: Gabriel Valiente: 9783540435501: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Algorithms-Trees-Graphs-Gabriel-Valiente/dp/3540435506/"
            }, {
               "date_added": "13192431565002053",
               "guid": "ae50cc69-1292-49a7-838c-9ff801f1c3f8",
               "id": "1298",
               "meta_info": {
                  "last_visited_desktop": "13192431565002973"
               },
               "name": "Graph Algorithms, 2nd Edition: Shimon Even: 9780521736534: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Graph-Algorithms-2nd-Shimon-Even/dp/0521736536/"
            }, {
               "date_added": "13192581089279980",
               "guid": "fdeb23fb-cd3c-4a28-9e85-a3c1a65e9108",
               "id": "1299",
               "meta_info": {
                  "last_visited_desktop": "13192581089283832"
               },
               "name": "A Small Matter of Programming: Perspectives on End User Computing: 9780262140539: Computer Science Books @ Amazon.com",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/gp/product/0262140535/"
            }, {
               "date_added": "13192840825713337",
               "guid": "16ccb282-197b-4682-93b5-f36b6b1cf30d",
               "id": "1606",
               "meta_info": {
                  "last_visited_desktop": "13192840825715831"
               },
               "name": "Pro TypeScript: Application-Scale JavaScript Development: Steve Fenton: 9781484232484: Amazon.com: Books",
               "type": "url",
               "url": "https://www.amazon.com/Pro-TypeScript-Application-Scale-JavaScript-Development/dp/1484232488/"
            }, {
               "date_added": "13193000322577430",
               "guid": "c2655280-4147-4e40-b943-fb10eda173a1",
               "id": "1301",
               "meta_info": {
                  "last_visited_desktop": "13193000322589306"
               },
               "name": "By Blood: A Novel: Ellen Ullman: 9781250023964: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/gp/product/1250023963/"
            }, {
               "date_added": "13193088561267012",
               "guid": "2981db7e-8ae5-4fed-9225-ba90c9eb4a43",
               "id": "1302",
               "meta_info": {
                  "last_visited_desktop": "13193088561277738"
               },
               "name": "Amazon.com: Close to the Machine: Technophilia and Its Discontents eBook: Ellen Ullman: Kindle Store",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Close-Machine-Technophilia-Its-Discontents-ebook/dp/B007FU83DY"
            }, {
               "date_added": "13193612248845919",
               "guid": "bbaaf2d8-b204-4da3-8553-fe9114756088",
               "id": "1305",
               "meta_info": {
                  "last_visited_desktop": "13193612248863007"
               },
               "name": "Amazon.com: The Blockchain and the New Architecture of Trust (Information Policy) (9780262038935): Kevin Werbach, Sandra Braman: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Blockchain-Architecture-Trust-Information-Policy/dp/0262038935/"
            }, {
               "date_added": "13193870353305743",
               "guid": "e106cd54-8844-4bd2-9133-641ea7282369",
               "id": "1308",
               "meta_info": {
                  "last_visited_desktop": "13193870353394763"
               },
               "name": "Ever Wonder Why? And Other Controversial Essays: Thomas Sowell: 9780817947521: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Ever-Wonder-Other-Controversial-Essays-dp-0817947523/dp/0817947523/"
            }, {
               "date_added": "13193910138535958",
               "guid": "51f0bcf0-7540-4d43-9ecc-bcf9561c6fdf",
               "id": "1309",
               "meta_info": {
                  "last_visited_desktop": "13193910138547099"
               },
               "name": "Americana: A 400-Year History of American Capitalism: Bhu Srinivasan: 9780399563799: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Americana-400-Year-History-American-Capitalism/dp/0399563792"
            }, {
               "date_added": "13194065554901857",
               "guid": "71fb2870-b929-403c-8fac-12d2bcbe46ac",
               "id": "1312",
               "meta_info": {
                  "last_visited_desktop": "13194065554938356"
               },
               "name": "The Infidel and the Professor: David Hume, Adam Smith, and the Friendship That Shaped Modern Thought: Dennis C. Rasmussen: 9780691177014: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Infidel-Professor-Friendship-Shaped-Thought/dp/0691177015"
            }, {
               "date_added": "13194839321377003",
               "guid": "93ad8502-a2bf-4151-a690-a6ba39428a78",
               "id": "1320",
               "meta_info": {
                  "last_visited_desktop": "13194839321381196"
               },
               "name": "Physarum Machines: Computers from Slime Mould (World Scientific Series on Nonlinear Science Series A): Andrew Adamatzky, Leon O. Chua: 9789814327589: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Physarum-Machines-Computers-Scientific-Nonlinear/dp/9814327581/"
            }, {
               "date_added": "13194839398313274",
               "guid": "2b013cf2-1232-468a-90a6-a858dd5dd567",
               "id": "1321",
               "meta_info": {
                  "last_visited_desktop": "13194839398323065"
               },
               "name": "From Parallel to Emergent Computing: Andrew Adamatzky, Selim Akl, Georgios Ch. Sirakoulis: 9781138054011: Amazon.com: Gateway",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Parallel-Emergent-Computing-Andrew-Adamatzky/dp/1138054011/ref=sr_1_fkmrnull_1?keywords=from+parallel+to+emergent+computing&qid=1550364594&s=gateway&sr=8-1-fkmrnull"
            }, {
               "date_added": "13195130641245225",
               "guid": "8d2f417c-151c-47a7-94c4-99e7ef426a58",
               "id": "1322",
               "meta_info": {
                  "last_visited_desktop": "13195130641258976"
               },
               "name": "Algorithms: Sanjoy Dasgupta Algorithms, Christos H. Papadimitriou Algorithms, Umesh Vazirani Algorithms: 9780073523408: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Algorithms-Sanjoy-Dasgupta/dp/0073523402"
            }, {
               "date_added": "13196035444497422",
               "guid": "b19d110a-9e40-4806-98c2-72f3290d8d7f",
               "id": "1350",
               "meta_info": {
                  "last_visited_desktop": "13196035444498248"
               },
               "name": "The Hundred-Page Machine Learning Book: Andriy Burkov: 9781999579500: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Hundred-Page-Machine-Learning-Book/dp/199957950X"
            }, {
               "date_added": "13196166768332736",
               "guid": "8fa93b89-e9c8-47ef-b95f-f02901be1523",
               "id": "1351",
               "meta_info": {
                  "last_visited_desktop": "13196166768333403"
               },
               "name": "Graphics Shaders: Theory and Practice, Second Edition: 9781568814346: Computer Science Books @ Amazon.com",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Graphics-Shaders-Theory-Practice-Second/dp/1568814348/ref=cm_cr_arp_d_product_top?ie=UTF8"
            }, {
               "date_added": "13196299192412037",
               "guid": "63cf2d8a-ff72-429d-a1f0-65b5348059c1",
               "id": "1355",
               "meta_info": {
                  "last_visited_desktop": "13196299192414605"
               },
               "name": "Practical Foundations for Programming Languages: 9781107150300: Computer Science Books @ Amazon.com",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Practical-Foundations-Programming-Languages-Robert/dp/1107150302"
            }, {
               "date_added": "13196493147784709",
               "guid": "d95b6b6d-be97-450e-bbeb-a296c93654fd",
               "id": "1356",
               "meta_info": {
                  "last_visited_desktop": "13196493147785059"
               },
               "name": "The Making of Prince of Persia: Journals 1985 - 1993: Jordan Mechner, Danica Novgorodoff: 9781468093650: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Making-Prince-Persia-Journals-1985/dp/1468093657"
            }, {
               "date_added": "13198571725628252",
               "guid": "b63484e6-9609-44f6-affb-36853eaa5054",
               "id": "1369",
               "meta_info": {
                  "last_visited_desktop": "13198571725643783"
               },
               "name": "Amazon.com: The Embodied Mind: Cognitive Science and Human Experience (The MIT Press) (9780262529365): Francisco J. Varela: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Embodied-Mind-Cognitive-Science-Experience/dp/026252936X/"
            }, {
               "date_added": "13198820554464735",
               "guid": "aef052a8-31f9-4820-890e-d3b8b360b273",
               "id": "1370",
               "meta_info": {
                  "last_visited_desktop": "13198820554481194"
               },
               "name": "Unthought: The Power of the Cognitive Nonconscious: N. Katherine Hayles: 9780226447742: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Unthought-Cognitive-Nonconscious-Katherine-Hayles/dp/022644774X/"
            }, {
               "date_added": "13199793284923040",
               "guid": "6850ba31-fa55-4e04-b153-b876097e425e",
               "id": "1373",
               "meta_info": {
                  "last_visited_desktop": "13199793284942190"
               },
               "name": "Amazon.com: Postwar: A History of Europe Since 1945 eBook: Tony Judt: Kindle Store",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Postwar-History-Europe-Since-1945-ebook/dp/B000SEGSB8"
            }, {
               "date_added": "13200130449518157",
               "guid": "f96176a1-27ac-4c3e-b767-afd25ec09fdd",
               "id": "1375",
               "meta_info": {
                  "last_visited_desktop": "13200130449531931"
               },
               "name": "Blueprint: The Evolutionary Origins of a Good Society - Kindle edition by Nicholas A. Christakis. Politics & Social Sciences Kindle eBooks @ Amazon.com.",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/gp/product/B07F67B9P4"
            }, {
               "date_added": "13200279100182125",
               "guid": "d9530f0a-787b-4fb0-aaed-7c0283db1c5d",
               "id": "1376",
               "meta_info": {
                  "last_visited_desktop": "13200279100186329"
               },
               "name": "Lab Rats: How Silicon Valley Made Work Miserable for the Rest of Us: Dan Lyons: 9780316561860: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Lab-Rats-Silicon-Valley-Miserable/dp/031656186X"
            }, {
               "date_added": "13200369662737310",
               "guid": "d6ea572a-c293-45ae-ac9c-3db4c3f95599",
               "id": "1377",
               "meta_info": {
                  "last_visited_desktop": "13200369662739684"
               },
               "name": "(Dreyfus/Heidegger) Being-in-the-World: A Commentary on Heidegger's Being and Time, Division I (9780262540568): Hubert L. Dreyfus: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Being-World-Commentary-Heideggers-Division/dp/0262540568"
            }, {
               "date_added": "13200371302992371",
               "guid": "9f4b21c5-6ed7-4908-9dc5-9d19a07732e7",
               "id": "1378",
               "meta_info": {
                  "last_visited_desktop": "13200371302995076"
               },
               "name": "Amazon.com: A Thousand Years of Nonlinear History (9780942299328): Manuel De Landa: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Thousand-Years-Nonlinear-History/dp/0942299329/"
            }, {
               "date_added": "13200557431063491",
               "guid": "7b78104d-6142-420b-b247-2f51f7b983b0",
               "id": "1380",
               "meta_info": {
                  "last_visited_desktop": "13200557431089058"
               },
               "name": "Interzone: William S. Burroughs, James Grauerholz: 9780140094510: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Interzone-William-S-Burroughs/dp/0140094512/"
            }, {
               "date_added": "13200565888527862",
               "guid": "fdf92ecf-1851-4d81-b668-9410f9b2ac3c",
               "id": "1381",
               "meta_info": {
                  "last_visited_desktop": "13200565888529189"
               },
               "name": "Readings in Database Systems 4e: JM Hellerstein: 9780262693233: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Readings-Database-Systems-4e-Hellerstein/dp/0262693232/"
            }, {
               "date_added": "13201275989452515",
               "guid": "58b07eb3-63db-4e07-b4c1-7bf66b7663e1",
               "id": "1382",
               "meta_info": {
                  "last_visited_desktop": "13201275989468184"
               },
               "name": "The Theoretical Minimum: What You Need to Know to Start Doing Physics: Leonard Susskind, George Hrabovsky: 8601407150309: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Theoretical-Minimum-Start-Doing-Physics/dp/046502811X/"
            }, {
               "date_added": "13201756359905983",
               "guid": "38c1055f-4ff2-4084-8129-7fcf6737f180",
               "id": "1383",
               "meta_info": {
                  "last_visited_desktop": "13201756359913800"
               },
               "name": "Lambda-Calculus and Combinators: An Introduction: J. Roger Hindley, Jonathan P. Seldin: 9780521898850: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Lambda-Calculus-Combinators-Introduction-Roger-Hindley/dp/0521898854/"
            }, {
               "date_added": "13201758425605146",
               "guid": "a968c0b3-ad4c-4187-b956-713a79ed08ed",
               "id": "1384",
               "meta_info": {
                  "last_visited_desktop": "13201758425608683"
               },
               "name": "Amazon.com: Alfred Tarski (9780521714013): Anita Burdman Feferman: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Alfred-Tarski-Anita-Burdman-Feferman/dp/052171401X"
            }, {
               "date_added": "13201811745716016",
               "guid": "0328761a-69bd-4e1a-bd2e-2d1b94a59f40",
               "id": "1385",
               "meta_info": {
                  "last_visited_desktop": "13201811745717396"
               },
               "name": "The Rebel: An Essay on Man in Revolt (Vintage International) - Kindle edition by Albert Camus. Politics & Social Sciences Kindle eBooks @ Amazon.com.",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/B0092EE9TI/?tag=meaningness-20"
            }, {
               "date_added": "13201944371851868",
               "guid": "f99b967e-a49e-43ef-8dcb-45005fa86d2a",
               "id": "1387",
               "meta_info": {
                  "last_visited_desktop": "13201944371853155"
               },
               "name": "The Stars My Destination: Alfred Bester, Alexander Eisenstein, Phyllis Eisenstein, Neil Gaiman: 9780679767800: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Stars-My-Destination-Alfred-Bester/dp/B0026P9LFW/"
            }, {
               "date_added": "13201945134526612",
               "guid": "a5b088b1-d5e7-4c6c-9872-691a9278697f",
               "id": "1388",
               "meta_info": {
                  "last_visited_desktop": "13201945134527329"
               },
               "name": "Amazon.com: A Walker in the City (9780156941761): Alfred Kazin: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Walker-City-Alfred-Kazin/dp/0156941767/"
            }, {
               "date_added": "13201945320320653",
               "guid": "d34794f6-521d-452b-873e-72d0621a6648",
               "id": "1389",
               "meta_info": {
                  "last_visited_desktop": "13201945320321365"
               },
               "name": "Amazon.com: Call It Sleep: A Novel (9780312424121): Henry Roth, Alfred Kazin: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Call-Sleep-Novel-Henry-Roth/dp/0312424124/"
            }, {
               "date_added": "13201945456565698",
               "guid": "2e07b4cb-6363-4548-a242-4d353deed845",
               "id": "1390",
               "meta_info": {
                  "last_visited_desktop": "13201945456566494"
               },
               "name": "Amazon.com: The Fortress of Solitude (9780375724886): Jonathan Lethem: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Fortress-Solitude-Jonathan-Lethem/dp/0375724885"
            }, {
               "date_added": "13201946253766377",
               "guid": "ec246140-3ab9-47fa-ab09-77d18fc52f2e",
               "id": "1391",
               "meta_info": {
                  "last_visited_desktop": "13201946253767340"
               },
               "name": "Thoughts Without Cigarettes: A Memoir: Oscar Hijuelos: 9781592406296: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Thoughts-Without-Cigarettes-Oscar-Hijuelos/dp/1592406297/"
            }, {
               "date_added": "13201986303805042",
               "guid": "d61469fc-4970-4f1c-b1c2-eeb06238dcdb",
               "id": "1392",
               "meta_info": {
                  "last_visited_desktop": "13201986303806464"
               },
               "name": "The Book of Illusions: A Novel: Paul Auster: 9780312429010: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Book-Illusions-Novel-Paul-Auster/dp/0312429010"
            }, {
               "date_added": "13202260787415793",
               "guid": "49d80d66-58cb-4464-975d-16c4cff4ba9b",
               "id": "1393",
               "meta_info": {
                  "last_visited_desktop": "13202260787420065"
               },
               "name": "Physics from Symmetry (Undergraduate Lecture Notes in Physics): Jakob Schwichtenberg: 9783319666303: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Physics-Symmetry-Undergraduate-Lecture-Notes/dp/3319666304"
            }, {
               "date_added": "13202261612397510",
               "guid": "b668048b-5b23-4ec8-979d-4633f60dd650",
               "id": "1394",
               "meta_info": {
                  "last_visited_desktop": "13202261612400554"
               },
               "name": "From Bacteria to Bach and Back: The Evolution of Minds: Daniel C. Dennett: 9780393355505: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Bacteria-Bach-Back-Evolution-Minds/dp/0393355500/"
            }, {
               "date_added": "13203240860440449",
               "guid": "b5e7614a-749e-46c1-89c1-07dd83495bb9",
               "id": "1397",
               "meta_info": {
                  "last_visited_desktop": "13203240860470579"
               },
               "name": "(George Gamow) Thirty Years that Shook Physics: The Story of Quantum Theory",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Thirty-Years-that-Shook-Physics/dp/048624895X/ref=pd_sim_14_3/139-1185672-8857150?_encoding=UTF8&pd_rd_i=048624895X&pd_rd_r=051d33b4-7eb9-11e9-b9be-2339e3b9437a&pd_rd_w=c4ubD&pd_rd_wg=TP4BO&pf_rd_p=90485860-83e9-4fd9-b838-b28a9b7fda30&pf_rd_r=XW8DCZEMMCA7GW3WZ26J&psc=1&refRID=XW8DCZEMMCA7GW3WZ26J"
            }, {
               "date_added": "13203412418185395",
               "guid": "76b35678-fe33-4081-a4aa-ceb1775b1942",
               "id": "1398",
               "meta_info": {
                  "last_visited_desktop": "13203412418190749"
               },
               "name": "The Scientist as Rebel (New York Review Books (Paperback)): Freeman Dyson: 9781590172940: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Scientist-Rebel-Review-Books-Paperback/dp/1590172949/"
            }, {
               "date_added": "13203821789199176",
               "guid": "d9d349ba-fbdf-4bad-b890-739a5b243adb",
               "id": "1399",
               "meta_info": {
                  "last_visited_desktop": "13203821789200591"
               },
               "name": "Amazon.com: An Elegant Puzzle: Systems of Engineering Management (9781732265189): Will Larson: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Elegant-Puzzle-Systems-Engineering-Management/dp/1732265186/"
            }, {
               "date_added": "13204944747138403",
               "guid": "4954612e-8747-4c5b-b8d1-16c4b8f446d5",
               "id": "1401",
               "meta_info": {
                  "last_visited_desktop": "13204944747156244"
               },
               "name": "The Book Of Mister Natural (9781606993521): Robert Crumb: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Book-Mister-Natural-Robert-Crumb/dp/1606993526/ref=pd_sim_14_5/139-1185672-8857150?_encoding=UTF8&pd_rd_i=1606993526&pd_rd_r=8ccb2ec8-8b6e-11e9-89d2-b1086b166d11&pd_rd_w=lwpm1&pd_rd_wg=4oSvk&pf_rd_p=90485860-83e9-4fd9-b838-b28a9b7fda30&pf_rd_r=BDYZ5FYPHDYK8DSJMXG4&psc=1&refRID=BDYZ5FYPHDYK8DSJMXG4"
            }, {
               "date_added": "13206240216469767",
               "guid": "673c81bd-7774-409b-864c-00d6e2c76b92",
               "id": "1406",
               "name": "Prodigals: Stories: Greg Jackson: 9781250118059: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/1250118050?psc=1&pf_rd_p=ee4b02ee-7e36-4b5c-9753-785e0a707ad0&pf_rd_r=DFPB9P67MBTEXHXVPPC6&pd_rd_wg=ICIrt&pd_rd_i=1250118050&pd_rd_w=b4qxH&pd_rd_r=3cbe605a-d04f-40e0-bebc-a123ab4caceb&ref_=pd_luc_rh_rtpb_01_01_t_img_lh"
            }, {
               "date_added": "13208771719572819",
               "guid": "19b80020-b0a9-4ca5-9ab0-06915a3113cf",
               "id": "1417",
               "name": "Guide to Computational Geometry Processing: Foundations, Algorithms, and Methods: J. Andreas Bærentzen, Jens Gravesen, François Anton, Henrik Aanæs: 9781447140740: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Guide-Computational-Geometry-Processing-Foundations/dp/1447140745/"
            }, {
               "date_added": "13209373781687513",
               "guid": "a2d42bcd-d97f-41b4-8924-3b5d1bcd14ff",
               "id": "1427",
               "name": "(PG rec.) Albert Einstein: Creator and Rebel: Banesh Hoffman, Helen Dukas: 9780670111817: Amazon.com: Gateway",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Albert-Einstein-Creator-Banesh-Hoffman/dp/0670111813/ref=sr_1_1?keywords=hoffman+einstein+biography&qid=1564899747&s=gateway&sr=8-1"
            }, {
               "date_added": "13209967604740917",
               "guid": "f1e41c76-d281-43bd-9ea6-8679581cc4cf",
               "id": "1438",
               "name": "The Sciences of the Artificial - 3rd Edition: Herbert A Simon: 9780262691918: Amazon.com: Gateway",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Sciences-Artificial-3rd-Herbert-Simon/dp/0262691914/ref=sr_1_2?keywords=sciences+of+the+artificial&qid=1565493933&s=gateway&sr=8-2"
            }, {
               "date_added": "13209967639425938",
               "guid": "c1b28a12-f032-4ee6-bcbf-0bbb00dcac20",
               "id": "1439",
               "name": "Computation: Finite and Infinite Machines (Automatic Computation): Marvin Lee Minsky: 9780131655638: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Computation-Finite-Infinite-Machines-Automatic/dp/0131655639/"
            }, {
               "date_added": "13210248852050292",
               "guid": "9421b688-29df-41be-b649-c264800a511b",
               "id": "1442",
               "name": "Hard Drive: Bill Gates and the Making of the Microsoft Empire: James Wallace, Jim Erickson: 9780887306297: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Hard-Drive-Making-Microsoft-Empire/dp/0887306292/"
            }, {
               "date_added": "13210252174603262",
               "guid": "f5ab738e-f4f0-4837-b4bb-3ef1c15b2aa3",
               "id": "1441",
               "name": "Topological Signal Processing (Mathematical Engineering): Michael Robinson: 9783642361036: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Topological-Signal-Processing-Mathematical-Engineering/dp/364236103X"
            }, {
               "date_added": "13210335171281144",
               "guid": "c17d1b2f-816f-44ba-b0c1-9881fca04db5",
               "id": "1440",
               "name": "Amazon.com: Lent eBook: Jo Walton: Kindle Store",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Lent-Jo-Walton-ebook/dp/B07GV9K8X6/"
            }, {
               "date_added": "13211441368365803",
               "guid": "7e9a4fb9-860b-4670-a9f9-8151e827b304",
               "id": "1443",
               "name": "Idea Makers: Personal Perspectives on the Lives & Ideas of Some Notable People: Stephen Wolfram: 9781579550035: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Idea-Makers-Personal-Perspectives-Notable/dp/1579550037"
            }, {
               "date_added": "13211630780810655",
               "guid": "98fe8323-e611-4503-b304-e6cef01c8b89",
               "id": "1445",
               "name": "Topology via Logic (Cambridge Tracts in Theoretical Computer Science): Steven Vickers: 9780521576512: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Topology-Cambridge-Theoretical-Computer-Science/dp/0521576512/ref=cm_cr_arp_d_product_top?ie=UTF8"
            }, {
               "date_added": "13211630945006683",
               "guid": "5dfaa6d6-0228-4ca1-a62f-f2a60c7b72da",
               "id": "1446",
               "name": "Fundamentals of Modern Manufacturing: Materials, Processes, and Systems, 6th Edition, Mikell P. Groover, eBook - Amazon.com",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Fundamentals-Modern-Manufacturing-Materials-Processes-ebook/dp/B01AKSZ9NE"
            }, {
               "date_added": "13211632694016525",
               "guid": "08d255b0-f503-4f15-8e98-7a7fcd51ac88",
               "id": "1448",
               "name": "Denotational Semantics: The Scott-Strachey Approach to Programming Language Theory (Computer Science Series): 8601422438956: Computer Science Books @ Amazon.com",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Denotational-Semantics-Scott-Strachey-Approach-Programming/dp/0262690764/ref=pd_sbs_14_1/139-4029208-7838618?_encoding=UTF8&pd_rd_i=0262690764&pd_rd_r=6c0b27af-19b0-4a4e-9d42-6112f40c4620&pd_rd_w=Rr3Qi&pd_rd_wg=MpQ7D&pf_rd_p=43281256-7633-49c8-b909-7ffd7d8cb21e&pf_rd_r=0NMYSHMWS6QENYM22T8J&psc=1&refRID=0NMYSHMWS6QENYM22T8J"
            }, {
               "date_added": "13211856011091786",
               "guid": "b45bb857-02ca-47fc-a7b5-e199d046e0d6",
               "id": "1513",
               "name": "Michael Faraday (The Da Capo series in science): L. Pearce Williams: 9780306802997: Amazon.com: Books",
               "type": "url",
               "url": "https://www.amazon.com/Michael-Faraday-science-Pearce-Williams/dp/0306802996/"
            }, {
               "date_added": "13212015750836650",
               "guid": "63854f13-8ebf-4343-b39c-b1614394cf55",
               "id": "1451",
               "name": "The Second Kind of Impossible: The Extraordinary Quest for a New Form of Matter: Paul Steinhardt: 9781476729923: Amazon.com: Books",
               "sync_transaction_version": "17",
               "type": "url",
               "url": "https://www.amazon.com/Second-Kind-Impossible-Extraordinary-Matter/dp/1476729921"
            }, {
               "date_added": "13212046399076027",
               "guid": "c2d21c36-7201-4b8a-9569-f6bfa22725b0",
               "id": "1452",
               "name": "Amazon.com: Artificial Intelligence: A Modern Approach (9789332543515): Stuart Russell: Gateway",
               "sync_transaction_version": "16",
               "type": "url",
               "url": "https://www.amazon.com/Artificial-Intelligence-Approach-Stuart-Russell/dp/9332543518/ref=sr_1_2?keywords=AI%3A+A+Modern+Approach&qid=1567572610&s=gateway&sr=8-2"
            }, {
               "date_added": "13212126056844651",
               "guid": "b7f60e21-ffa3-4e96-ac1c-a4c7e4de91da",
               "id": "1453",
               "name": "Prime Suspects: The Anatomy of Integers and Permutations: Andrew Granville, Jennifer Granville, Robert J. Lewis: 9780691149158: Amazon.com: Books",
               "sync_transaction_version": "18",
               "type": "url",
               "url": "https://www.amazon.com/Prime-Suspects-Anatomy-Integers-Permutations/dp/0691149151"
            }, {
               "date_added": "13212156798883202",
               "guid": "a5784f98-908b-47c2-a21d-1334f12d33ca",
               "id": "1454",
               "name": "Surfing Uncertainty: Prediction, Action, and the Embodied Mind: 9780190217013: Medicine & Health Science Books @ Amazon.com",
               "sync_transaction_version": "19",
               "type": "url",
               "url": "https://www.amazon.com/Surfing-Uncertainty-Prediction-Action-Embodied/dp/0190217014/"
            }, {
               "date_added": "13212748245153720",
               "guid": "9711f346-c302-4003-a538-47f0078ceaae",
               "id": "1457",
               "name": "Real Analysis: A Long-Form Mathematics Textbook: Jay Cummings: 9781077254541: Amazon.com: Books",
               "sync_transaction_version": "27",
               "type": "url",
               "url": "https://www.amazon.com/Real-Analysis-Long-Form-Mathematics-Textbook/dp/1077254547/"
            }, {
               "date_added": "13212963785462466",
               "guid": "92f68872-695d-4933-add1-736bc18d6e7f",
               "id": "1511",
               "name": "Amazon.com: Metametaphysics: New Essays On The Foundations Of Ontology (9780199546008): David Chalmers, David Manley, Ryan Wasserman: Books",
               "type": "url",
               "url": "https://www.amazon.com/Metametaphysics-New-Essays-Foundations-Ontology/dp/0199546002"
            }, {
               "date_added": "13212964304837478",
               "guid": "16f531a8-0eb6-479d-b009-ca9246d9289a",
               "id": "1459",
               "name": "Semantics with Applications: An Appetizer (Undergraduate Topics in Computer Science): Hanne Riis Nielson, Flemming Nielson: 9781846286919: Amazon.com: Books",
               "sync_transaction_version": "32",
               "type": "url",
               "url": "https://www.amazon.com/gp/product/1846286913"
            }, {
               "date_added": "13213059132701268",
               "guid": "1a49286c-e1b3-4770-b1cb-ff0d9b0be7cd",
               "id": "1460",
               "name": "An Introduction to Manifolds: Second Edition (Universitext): Loring W. W. Tu: 9781441973993: Amazon.com: Books",
               "sync_transaction_version": "35",
               "type": "url",
               "url": "https://www.amazon.com/Introduction-Manifolds-Second-Universitext/dp/1441973990/"
            }, {
               "date_added": "13213141912848186",
               "guid": "a7ba3ca4-fbef-4ad2-929f-01dba76501c1",
               "id": "1526",
               "name": "Certified Programming with Dependent Types: A Pragmatic Introduction to the Coq Proof Assistant (The MIT Press): Adam Chlipala: 9780262026659: Amazon.com: Books",
               "type": "url",
               "url": "https://www.amazon.com/gp/product/0262026651/"
            }, {
               "date_added": "13213142832528705",
               "guid": "af357171-0cd3-48e9-ac1e-4c9cbb08c1ef",
               "id": "1462",
               "name": "Type-driven Development with Idris: Edwin Brady: 9781617293023: Amazon.com: Books",
               "sync_transaction_version": "40",
               "type": "url",
               "url": "https://www.amazon.com/Type-driven-Development-Idris-Edwin-Brady/dp/1617293024/"
            }, {
               "date_added": "13213333783879387",
               "guid": "cd8a12c6-6340-4744-9e62-6766691b6a97",
               "id": "1465",
               "name": "The Evolution of Applied Harmonic Analysis: Models of the Real World: Elena Prestini: 9780817641252: Amazon.com: Books",
               "sync_transaction_version": "57",
               "type": "url",
               "url": "https://www.amazon.com/Evolution-Applied-Harmonic-Analysis-Models/dp/0817641254/"
            }, {
               "date_added": "13213335884723014",
               "guid": "cb096c8f-4a51-435d-9dcb-7bbcebbe58c8",
               "id": "1466",
               "name": "(Gian-Carlo Rota) Indiscrete Thoughts",
               "sync_transaction_version": "59",
               "type": "url",
               "url": "https://www.amazon.com/Indiscrete-Thoughts-Gian-Carlo-Rota/dp/0817638660"
            }, {
               "date_added": "13213392219198062",
               "guid": "790f8b76-27ab-411b-8e68-dbf4a4158590",
               "id": "1467",
               "name": "Amazon.com: Real Analysis (9780521497565): N. L. Carothers: Books",
               "sync_transaction_version": "58",
               "type": "url",
               "url": "https://www.amazon.com/Real-Analysis-N-L-Carothers/dp/0521497566"
            }, {
               "date_added": "13213577825531097",
               "guid": "990e9c5a-e696-4b44-aba4-2826a8ed02b5",
               "id": "1468",
               "name": "Linear Algebra and Learning from Data: Gilbert Strang: 9780692196380: Amazon.com: Books",
               "sync_transaction_version": "62",
               "type": "url",
               "url": "https://www.amazon.com/Linear-Algebra-Learning-Gilbert-Strang/dp/0692196382"
            }, {
               "date_added": "13213581618283016",
               "guid": "f380a324-3b6b-41b6-91af-860cac835db7",
               "id": "1469",
               "name": "Impro: Improvisation and the Theatre: Keith Johnstone: 9780878301171: Amazon.com: Books",
               "sync_transaction_version": "65",
               "type": "url",
               "url": "https://www.amazon.com/Impro-Improvisation-Theatre-Keith-Johnstone/dp/0878301178/"
            }, {
               "date_added": "13214094812878651",
               "guid": "b07e6e57-e087-4d10-afb0-0fa84bf94414",
               "id": "1470",
               "name": "Elements of Clojure: Zachary Tellman: 9780359360581: Amazon.com: Books",
               "sync_transaction_version": "68",
               "type": "url",
               "url": "https://www.amazon.com/Elements-Clojure-Zachary-Tellman/dp/0359360580"
            }, {
               "date_added": "13214372696202944",
               "guid": "f16de3e5-9d71-4ce3-a0ec-5645346aa798",
               "id": "1471",
               "name": "Modern Engineering for Design of Liquid Propellant Rocket Engines (Progress in Astronautics and Aeronautics): Dieter K Huzel, David H Huang, Rocketdyne Division of Rockwell International D Huzel and D Huang, Harry Arbit, American Institute of Aeronautics and Astronautics, D K Huzel, D H Huang: 9781563470134: Amazon.com: Books",
               "sync_transaction_version": "71",
               "type": "url",
               "url": "https://www.amazon.com/Engineering-Liquid-Propellant-Progress-Astronautics-Aeronautics/dp/1563470136"
            }, {
               "date_added": "13214373941234505",
               "guid": "e9d82c36-06a9-4a54-82c1-e039cc5c07ee",
               "id": "1472",
               "name": "Ignition!: An Informal History of Liquid Rocket Propellants (Rutgers University Press Classics): John Drury Clark, Isaac Asimov: 9780813595832: Amazon.com: Books",
               "sync_transaction_version": "74",
               "type": "url",
               "url": "https://www.amazon.com/Ignition-Informal-Propellants-University-Classics/dp/0813595835/"
            }, {
               "date_added": "13214453689998885",
               "guid": "a7e78fc3-c7ea-471e-9460-575e7b192857",
               "id": "1473",
               "name": "Feedback Control for Computer Systems: Introducing Control Theory to Enterprise Programmers: Philipp K. Janert: 9781449361693: Amazon.com: Books",
               "sync_transaction_version": "77",
               "type": "url",
               "url": "https://www.amazon.com/Feedback-Control-Computer-Systems-Introducing/dp/1449361692/"
            }, {
               "date_added": "13215045729017194",
               "guid": "b2a64a36-8581-478d-b41f-31f69f71f6a8",
               "id": "1476",
               "name": "Amazon.com: An Elegant Puzzle: Systems of Engineering Management (9781732265189): Will Larson: Books",
               "type": "url",
               "url": "https://www.amazon.com/Elegant-Puzzle-Systems-Engineering-Management/dp/1732265186"
            }, {
               "date_added": "13215400718623533",
               "guid": "46cd4871-dffc-48b0-8838-f5bab008cbf5",
               "id": "1480",
               "name": "The Feeling of Life Itself: Why Consciousness Is Widespread but Can't Be Computed (The MIT Press): Christof Koch: 9780262042819: Amazon.com: Books",
               "type": "url",
               "url": "https://www.amazon.com/Feeling-Life-Itself-Consciousness-Widespread/dp/0262042819/"
            }, {
               "date_added": "13216519519609929",
               "guid": "9e763c86-905a-4adc-8291-a8837a175a31",
               "id": "1482",
               "name": "Amazon.com: Oracles and Demons of Tibet: The Cult and Iconography of the Tibetan Protective Deities (9788173030390): Rene de Nebesky-Wojkowitz: Books",
               "type": "url",
               "url": "https://www.amazon.com/dp/8173030391"
            }, {
               "date_added": "13216774699211697",
               "guid": "e1cbbfa0-afd4-4bd8-bd88-cf0ef2c684d0",
               "id": "1483",
               "name": "Visual Group Theory (MAA Problem Book Series): Nathan Carter: 9780883857571: Amazon.com: Books",
               "type": "url",
               "url": "https://www.amazon.com/Visual-Group-Theory-Problem-Book/dp/088385757X"
            }, {
               "date_added": "13216774754082491",
               "guid": "0518356a-7f92-4064-a48e-90a854853ca4",
               "id": "1484",
               "name": "Amazon.com: The Man Without Qualities Vol. 1: A Sort of Introduction and Pseudo Reality Prevails (9780679767879): Robert Musil, Sophie Wilkins, Burton Pike: Books",
               "type": "url",
               "url": "https://www.amazon.com/dp/0679767878/"
            }, {
               "date_added": "13216775083675792",
               "guid": "a09488d1-66a5-4185-862d-85a932983cdf",
               "id": "1485",
               "name": "Amazon.com: The Man Without Qualities Vol. 1: A Sort of Introduction and Pseudo Reality Prevails (9780679767879): Robert Musil, Sophie Wilkins, Burton Pike: Books",
               "type": "url",
               "url": "https://www.amazon.com/Man-Without-Qualities-Vol-Introduction/dp/0679767878"
            }, {
               "date_added": "13216902925934564",
               "guid": "ed754cde-8804-44ee-8fb6-c3a7253b5fe5",
               "id": "1489",
               "name": "Amazon.com: Betraying Spinoza: The Renegade Jew Who Gave Us Modernity (Jewish Encounters Series) eBook: Rebecca Goldstein: Kindle Store",
               "type": "url",
               "url": "https://www.amazon.com/Betraying-Spinoza-Renegade-Modernity-Encounters-ebook/dp/B002JKVXG4"
            }, {
               "date_added": "13218085768896648",
               "guid": "7cffd77f-7b98-4071-b2d5-335fe1472bab",
               "id": "1491",
               "name": "The Man Who Solved the Market: How Jim Simons Launched the Quant Revolution: Gregory Zuckerman: 9780735217980: Amazon.com: Books",
               "type": "url",
               "url": "https://www.amazon.com/Man-Who-Solved-Market-Revolution/dp/073521798X/"
            }, {
               "date_added": "13219144900441256",
               "guid": "42e10ed4-3a07-4a6e-bdeb-7428913af086",
               "id": "1492",
               "name": "Mathematical Methods in the Physical Sciences: Mary L. Boas: 8601300290140: Amazon.com: Books",
               "type": "url",
               "url": "https://www.amazon.com/Mathematical-Methods-Physical-Sciences-Mary/dp/0471198269"
            }, {
               "date_added": "13219487509586318",
               "guid": "4ff58887-7763-4c33-a3a0-a60556818022",
               "id": "1495",
               "name": "Amazon.com: Probability Theory: The Logic of Science (9780521592710): E. T. Jaynes, G. Larry Bretthorst: Books",
               "type": "url",
               "url": "https://www.amazon.com/Probability-Theory-Science-T-Jaynes/dp/0521592712/"
            }, {
               "date_added": "13220190835084996",
               "guid": "e019633f-91e3-47a4-b1d7-453e2d651081",
               "id": "1496",
               "name": "Ego and Archetype (C. G. Jung Foundation Books Series): Edward F. Edinger: 9780877735762: Amazon.com: Books",
               "type": "url",
               "url": "https://www.amazon.com/Ego-Archetype-Jung-Foundation-Books/dp/087773576X"
            }, {
               "date_added": "13221880967439455",
               "guid": "453a5608-f4e1-427f-97e5-3f02505c7e62",
               "id": "1663",
               "name": "Amazon.com: Creation Myths (9781570626067): Marie-Louise von Franz: Books",
               "type": "url",
               "url": "https://www.amazon.com/Creation-Myths-Marie-Louise-von-Franz/dp/1570626065/ref=sr_1_1?keywords=creation+myths&qid=1577407357&sr=8-1"
            }, {
               "date_added": "13222423596735653",
               "guid": "0ea2aeee-f8d4-419d-a17b-c8de00afe490",
               "id": "1665",
               "name": "Smalltalk-80: The Language and its Implementation: 9780201113716: Computer Science Books @ Amazon.com",
               "type": "url",
               "url": "https://www.amazon.com/Smalltalk-80-Language-Implementation-Adele-Goldberg/dp/0201113716/"
            }, {
               "date_added": "13223262590342100",
               "guid": "bb4be91e-983d-4879-bf72-afa1435918c9",
               "id": "1667",
               "name": "Raskin, The Humane Interface: New Directions for Designing Interactive Systems: Jef Raskin: 9780201379372: Amazon.com: Books",
               "type": "url",
               "url": "https://www.amazon.com/Humane-Interface-Directions-Designing-Interactive/dp/0201379376"
            }, {
               "date_added": "13223374257987131",
               "guid": "6fefb1f4-6086-4040-bad5-1e1babfcb385",
               "id": "1668",
               "name": "Amazon.com: Empire of Signs (9780374522070): Roland Barthes, Richard Howard: Books",
               "type": "url",
               "url": "https://www.amazon.com/Empire-Signs-Roland-Barthes/dp/0374522073/"
            }, {
               "date_added": "13223558665699399",
               "guid": "bd75cf27-834e-49c0-8262-5b431b5466cf",
               "id": "1670",
               "name": "Uncanny Valley: A Memoir: Anna Wiener: 9780374278014: Amazon.com: Books",
               "type": "url",
               "url": "https://www.amazon.com/Uncanny-Valley-Memoir-Anna-Wiener/dp/0374278016"
            }, {
               "date_added": "13223958861543826",
               "guid": "361d561d-e9b2-4fd5-afa6-8b220824a7c4",
               "id": "1671",
               "name": "The Variational Principles of Mechanics (Dover Books on Physics): Cornelius Lanczos: 9780486650678: Amazon.com: Books",
               "type": "url",
               "url": "https://www.amazon.com/Variational-Principles-Mechanics-Dover-Physics/dp/0486650677"
            } ],
            "date_added": "13057014348772156",
            "date_modified": "13223958861543826",
            "guid": "9c7051da-8900-4d5e-80eb-16eb6caaf7de",
            "id": "87",
            "name": "books",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13060861501992378",
               "guid": "49c21288-25c2-4ab1-80ab-9420c160eda8",
               "id": "554",
               "name": "Software Engineering Method and Theory",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://semat.org/"
            }, {
               "date_added": "13060863040255034",
               "guid": "58f563a7-ce83-4789-a417-65f787e80c40",
               "id": "558",
               "name": "The Phaneron » Blog Archive » In Search of a Paradigm: The Science of Methods",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://phaneron.rickmurphy.org/2012/08/in-search-of-a-paradigm-the-science-of-methods/"
            }, {
               "date_added": "13060863624558570",
               "guid": "045b4f87-ef1d-4eb8-a8aa-5636572eb871",
               "id": "560",
               "name": "Software Engineering Institute",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.sei.cmu.edu/"
            }, {
               "date_added": "13060864189540537",
               "guid": "f91d138a-185a-4dff-818a-f942e190b8eb",
               "id": "561",
               "name": "(important!)Software Engineering—3 year vision",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://semat.org/wp-content/uploads/2012/03/Semat_-_Three_Year_Vision13Jan12.pdf"
            }, {
               "date_added": "13073953237751000",
               "guid": "b7b6b6cf-feb0-4d3c-b125-cd57b73799ae",
               "id": "746",
               "name": "Goals for Better Code - Implement Complete Types - YouTube",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.youtube.com/watch?v=mYrbivnruYw"
            } ],
            "date_added": "13060861471234780",
            "date_modified": "13125613334868645",
            "guid": "2fa5cced-aaa0-4abc-a726-327bea522aae",
            "id": "553",
            "name": "Programming methodology essay",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13060852566884019",
               "guid": "7c3de771-507c-40ce-ba8d-c66a6a37aa7d",
               "id": "537",
               "name": "nLab (Category Theory Wiki)",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://ncatlab.org/nlab/show/HomePage"
            }, {
               "date_added": "13060852974944061",
               "guid": "2a9298c7-8c2e-4793-8100-c72d81db5bf9",
               "id": "542",
               "name": "Category Theory (Stanford Encyclopedia of Philosophy)",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://plato.stanford.edu/entries/category-theory/"
            }, {
               "date_added": "13060852985508922",
               "guid": "58e1b6af-0b9c-499a-8f5b-2d0b9a92eb25",
               "id": "543",
               "name": "Category Theory Demonstrations",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.j-paine.org/cgi-bin/webcats/webcats.php"
            }, {
               "date_added": "13060852992247395",
               "guid": "e3e24aa2-f99c-4202-b284-ac78be817636",
               "id": "544",
               "name": "What Might Categories do for AI and Cognitive Science?",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.j-paine.org/why_be_interested_in_categories.html"
            }, {
               "date_added": "13060853007534546",
               "guid": "ce5d0f04-2286-4d2e-827c-a8723fb5830c",
               "id": "545",
               "name": "(CT Journal) Theory and Applications of Categories",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.tac.mta.ca/tac/"
            }, {
               "date_added": "13060854070593329",
               "guid": "7a96aca6-bb5b-417c-bc65-9750b227b283",
               "id": "548",
               "name": "dblp: Joseph A. Goguen",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.informatik.uni-trier.de/~ley/pers/hd/g/Goguen:Joseph_A=.html"
            }, {
               "date_added": "13061003696377646",
               "guid": "84e9ef19-0473-4edf-8b5a-32ab3fa68815",
               "id": "572",
               "name": "Joyal's CatLab",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://ncatlab.org/joyalscatlab/published/HomePage"
            }, {
               "date_added": "13061012821769415",
               "guid": "33cf2584-3994-4307-8ac7-a58dd8dc2688",
               "id": "576",
               "name": "Reprints in Theory and Applications of Categories",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.tac.mta.ca/tac/reprints/index.html"
            }, {
               "date_added": "13061013639864900",
               "guid": "83b18d57-4388-4fe9-8bb6-b0a9aa8cf324",
               "id": "577",
               "name": "The n-Category Café",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://golem.ph.utexas.edu/category/"
            }, {
               "date_added": "13061014955556288",
               "guid": "1db6197a-c606-4a1a-ad20-6ea650004f1d",
               "id": "578",
               "name": "Homotopy Type Theory",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://homotopytypetheory.org/"
            }, {
               "date_added": "13061015041919000",
               "guid": "4b39aa0d-e73a-474b-9408-962cd5859dfb",
               "id": "579",
               "name": "John Baez: 'Network Theory: Overview' - YouTube",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.youtube.com/watch?v=p9VmyR-OMpM&feature=youtu.be"
            }, {
               "date_added": "13061249284975374",
               "guid": "039cc1b1-1905-4d4f-be65-8e855ccb6197",
               "id": "581",
               "name": "Category Theory for Programmers: The Preface | Bartosz Milewski's Programming Cafe",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/"
            }, {
               "date_added": "13061714483261201",
               "guid": "817309f7-5604-407b-8a07-3e602a7e5cdc",
               "id": "585",
               "name": "Wadler: Monads",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://homepages.inf.ed.ac.uk/wadler/topics/monads.html"
            }, {
               "date_added": "13136846344260756",
               "guid": "00928c44-d5c7-4bc3-ad30-c7c209fe1203",
               "id": "939",
               "meta_info": {
                  "last_visited_desktop": "13136846344262796"
               },
               "name": "(3) Category Theory for the Working Hacker by Philip Wadler - YouTube",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.youtube.com/watch?v=V10hzjgoklA"
            } ],
            "date_added": "13060852860369827",
            "date_modified": "13137626219730232",
            "guid": "ae4b8ee5-7732-476b-8332-10d280109c8c",
            "id": "541",
            "name": "Category Theory",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13062094478664710",
               "guid": "f5261502-73d5-4eea-a90c-ec9d6084272b",
               "id": "605",
               "name": "Guru - Hire Quality Freelancers And Find Freelance Jobs",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.guru.com/"
            }, {
               "date_added": "13062094489864000",
               "guid": "55a2ca78-7675-4e5b-9265-d4baa63eb7cf",
               "id": "606",
               "name": "Hire Freelancers & Get Freelance Jobs Online",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.odesk.com/"
            }, {
               "date_added": "13062094501679000",
               "guid": "b1baa48e-47dd-4660-b5b3-52a50473ea2e",
               "id": "607",
               "name": "Hire freelancers and find freelance jobs instantly | Elance",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.elance.com/"
            }, {
               "date_added": "13066114190102556",
               "guid": "0b148cae-78f9-47ee-b477-f34cbe0fd85a",
               "id": "647",
               "name": "Authentic Jobs ~ Full-time and freelance job opportunities for web, design, and creative professionals",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.authenticjobs.com/"
            } ],
            "date_added": "13062094444667710",
            "date_modified": "13125488526479826",
            "guid": "caecb78f-4813-47bb-ad34-5003a9aafbd9",
            "id": "604",
            "name": "freelance work",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13062189098533632",
               "guid": "4008cae6-28d3-4f4b-9359-135b57db53be",
               "id": "610",
               "name": "Amazon.com: The Four Foundations of Mindfulness in Plain English (9781614290384): Bhante Henepola Gunaratana: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Four-Foundations-Mindfulness-Plain-English/dp/1614290385#customerReviews"
            }, {
               "date_added": "13062190676754639",
               "guid": "cbe6d11f-ad70-40eb-8fe1-74f9dd0078c8",
               "id": "611",
               "name": "Amazon.com: Customer Reviews: Nothing Special",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Nothing-Special-Charlotte-J-Beck-ebook/product-reviews/B001VA1PIE/ref=sr_1_1_cm_cr_acr_txt?ie=UTF8&showViewpoints=1"
            }, {
               "date_added": "13062192963391744",
               "guid": "54bf5255-ff8e-4e06-8d5a-89cd256807b0",
               "id": "612",
               "name": "AYP Lesson 41 - Spinal Breathing Pranayama",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.aypsite.org/41.html"
            }, {
               "date_added": "13062192968351947",
               "guid": "0efacad4-34bb-47b9-8cab-26d781ec2939",
               "id": "613",
               "name": "Mantra Meditation | Dhyana | Yoga Pose",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.yogajournal.com/pose/mantra-meditation/"
            }, {
               "date_added": "13062261950521888",
               "guid": "1bb06423-b263-4084-b5cc-3b2b96e9cc8e",
               "id": "615",
               "name": "Taming the Mind : A Conversation with Dan Harris : : Sam Harris",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.samharris.org/index_dev.php/blog/item/taming-the-mind"
            }, {
               "date_added": "13062261983495238",
               "guid": "fda099d9-95e6-48db-bdee-ba7470b3ed2f",
               "id": "616",
               "name": "Waking Up With Sam Harris : Sam Harris",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.samharris.org/index_dev.php/store/event_series/waking-up-with-sam-harris"
            }, {
               "date_added": "13062261988535554",
               "guid": "a7519e92-b15d-4b9c-8e83-69744e99f0ab",
               "id": "617",
               "name": "How to Meditate : Sam Harris",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.samharris.org/blog/item/how-to-meditate"
            } ],
            "date_added": "13062189082724662",
            "date_modified": "13176941287958693",
            "guid": "56724675-a15d-403e-bda0-790cf6aa042b",
            "id": "609",
            "name": "Meditation",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13060858839627000",
               "guid": "bf68733c-883f-40be-bc16-f669a7f294ec",
               "id": "551",
               "name": "Maude system - Wikipedia, the free encyclopedia",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://en.wikipedia.org/wiki/Maude_system"
            }, {
               "date_added": "13060861803991684",
               "guid": "1478a2cc-4338-4a69-bc75-9cc19407a881",
               "id": "555",
               "name": "Cognitive Architectures for Conceptual Structures",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.jfsowa.com/pubs/ca4cs.pdf"
            }, {
               "date_added": "13060862776016255",
               "guid": "015ac0e9-e305-44e0-9f22-dfc56ef6dac2",
               "id": "556",
               "meta_info": {
                  "last_visited_desktop": "13199243789267986"
               },
               "name": "Conceptual Structures",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://conceptualstructures.org/"
            }, {
               "date_added": "13060862908763966",
               "guid": "f4363647-cbb8-41e9-928c-2e0580078fb5",
               "id": "557",
               "name": "Conceptual Graph Summary",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.jfsowa.com/cg/cgif.htm"
            }, {
               "date_added": "13061000005101000",
               "guid": "712cea16-d708-4558-a259-e3094bb578c1",
               "id": "571",
               "name": "Gellish - Wikipedia, the free encyclopedia",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://en.wikipedia.org/wiki/Gellish"
            }, {
               "date_added": "13061011272418411",
               "guid": "c1f13478-8c96-477b-b379-49e54211b038",
               "id": "575",
               "name": "Notation for Conceptual Blending",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://cseweb.ucsd.edu/~goguen/papers/blend.html"
            }, {
               "date_added": "13061814518294862",
               "guid": "8665684a-e5de-442c-a3d5-3fadf90571f5",
               "id": "592",
               "name": "OpenJDK: Graal",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://openjdk.java.net/projects/graal/"
            }, {
               "date_added": "13061815041902544",
               "guid": "948ee04a-e1f8-424f-a22c-c6ed9c296353",
               "id": "593",
               "name": "How Method Dispatch Works in JRuby/Truffle",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.chrisseaton.com/rubytruffle/how-method-dispatch-works-in-jruby-truffle/"
            }, {
               "date_added": "13063277782547838",
               "guid": "f71aa263-7668-417c-8aa8-dd7bac7b8bfa",
               "id": "624",
               "name": "Programming Languages: Application and Interpretation",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://cs.brown.edu/courses/cs173/2012/book/index.html"
            }, {
               "date_added": "13064970134945117",
               "guid": "cf01b6f0-40b9-483f-9e58-ebeef3eaa16d",
               "id": "637",
               "name": "Write You a Haskell ( Stephen Diehl )",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://dev.stephendiehl.com/fun/"
            }, {
               "date_added": "13065540528976076",
               "guid": "8d929466-6b46-4383-a8f8-9085979ad174",
               "id": "641",
               "name": "I'll share an *idea* for a logic programming project that I've been brewing for ... | Hacker News",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://news.ycombinator.com/item?id=8869652"
            }, {
               "date_added": "13074112523950000",
               "guid": "72972214-c662-4ba4-b965-2c3354ae00d7",
               "id": "747",
               "name": "Short history of routes computation",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://blog.tristramg.eu/short-history-of-routes-computation.html"
            } ],
            "date_added": "13060858824407401",
            "date_modified": "13125531742467564",
            "guid": "c8a7d453-9c50-420a-b309-ec6312fe1106",
            "id": "550",
            "name": "IA Project",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13060853190501762",
               "guid": "565a1403-d7bf-4e11-ab81-491775fd5124",
               "id": "547",
               "name": "Jocelyn Ireson-Paine",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.j-paine.org/index.html"
            }, {
               "date_added": "13060858181835253",
               "guid": "e0720bd4-8615-4399-82f6-56de42e2acad",
               "id": "549",
               "name": "McAlias — Medium",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://medium.com/@McCosmos/"
            }, {
               "date_added": "13060864253511156",
               "guid": "ff328b42-159d-426a-87a8-490a3547642e",
               "id": "562",
               "name": "rickmurphy",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.rickmurphy.org/"
            }, {
               "date_added": "13060865530806985",
               "guid": "ccd53d5d-fada-446c-b97b-1f19aaded022",
               "id": "563",
               "name": "Erik Myin | University of Antwerp - Academia.edu",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://antwerp.academia.edu/ErikMyin"
            }, {
               "date_added": "13061003810996544",
               "guid": "a28f365c-52cf-477a-96df-d898960535ff",
               "id": "573",
               "meta_info": {
                  "last_visited_desktop": "13184365387507455"
               },
               "name": "John Baez's Stuff",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://math.ucr.edu/home/baez/"
            }, {
               "date_added": "13061815298319196",
               "guid": "ec7216ba-790e-4165-98c0-cd9e699dce01",
               "id": "590",
               "name": "Oracle Labs | People Details",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://labs.oracle.com/pls/apex/f?p=labs:bio:0:137"
            }, {
               "date_added": "13061815537686738",
               "guid": "b9fb01db-4f67-4e5d-8f5a-fab2099527a6",
               "id": "591",
               "name": "www.wuerthinger.net",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.wuerthinger.net/"
            }, {
               "date_added": "13061950518365000",
               "guid": "c98698e7-bf72-48c1-9763-1d7b155b00af",
               "id": "600",
               "name": "About Jeffrey Ventrella – JJ Ventrella Thing",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://ventrellathing.wordpress.com/about/"
            }, {
               "date_added": "13062009864672532",
               "guid": "c6b9f97e-5bdc-4877-bebb-e131fa807265",
               "id": "603",
               "name": "TJRadcliffe.com | No question left unasked.",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.tjradcliffe.com/"
            }, {
               "date_added": "13062302943343569",
               "guid": "fca35360-b0ea-41b0-bce9-97930d992d12",
               "id": "618",
               "name": "Why I like XSLT. | Weird Scenes Inside The Goldmine",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://guy-murphy.github.io/2014/12/02/why-I-like-XSLT/"
            }, {
               "date_added": "13064264830215551",
               "guid": "691706bc-185a-4cf3-888b-de2a1f2519bc",
               "id": "632",
               "name": "Philip Guo - Intro",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.pgbovine.net/intro.htm"
            }, {
               "date_added": "13065140964412318",
               "guid": "9b8c2255-9e6b-46c4-9b20-f6bcf6190f65",
               "id": "638",
               "name": "dave's page of art and programming",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.pawfal.org/dave/index.cgi?Projects/Scheme%20Bricks"
            }, {
               "date_added": "13065958601995506",
               "guid": "778a6bb9-0472-42b0-9776-d8c14db7f6d5",
               "id": "644",
               "name": "Profile: kstenerud | Hacker News",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://news.ycombinator.com/user?id=kstenerud"
            }, {
               "date_added": "13066006072768881",
               "guid": "5c6bf73e-1ba8-4120-9b73-8d6dd3e33f95",
               "id": "645",
               "name": "Joseph Heavner - Quora",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.quora.com/Joseph-Heavner/"
            }, {
               "date_added": "13066132064561022",
               "guid": "aa0e0656-d835-4a1a-9086-88140b74773b",
               "id": "648",
               "name": "Download the latest indie games - itch.io",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://itch.io/"
            }, {
               "date_added": "13066132198189115",
               "guid": "a85a155d-ce63-4c5f-a916-e46350d617e4",
               "id": "649",
               "name": "Path Tracing 3D Fractals | Syntopia",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://blog.hvidtfeldts.net/index.php/2015/01/path-tracing-3d-fractals/"
            }, {
               "date_added": "13066143846550238",
               "guid": "97161f24-915a-4bfe-b9ad-8a5e119e02b0",
               "id": "650",
               "name": "Zackees Turn Signal Gloves by Zach Vorhies — Kickstarter",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.kickstarter.com/projects/zackees/zackees-turn-signal-gloves"
            }, {
               "date_added": "13066187515480845",
               "guid": "a25119d0-bef6-4e12-8eaa-f640b0fe2fb9",
               "id": "737",
               "name": "0 FPS | Mostly geometry",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://0fps.net/"
            }, {
               "date_added": "13128834267296967",
               "guid": "6ec21bf4-ea3f-46de-9897-d6ea3af69e0f",
               "id": "893",
               "name": "Sean T. McBeth: engineer, photographer, mad scientist",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.seanmcbeth.com/"
            } ],
            "date_added": "13060853172806900",
            "date_modified": "13160869430537999",
            "guid": "4e9a3479-e06b-409f-aca6-be7da56d8c1d",
            "id": "546",
            "name": "People",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13061820221258241",
               "guid": "40181bba-0e4d-45f4-a690-661cd28dcec6",
               "id": "594",
               "name": "Feature extraction and iconic visualization",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.cg.its.tudelft.nl/visualisation/intranet/Theo/iconic.html"
            }, {
               "date_added": "13061820237766241",
               "guid": "97f1a6c7-1f6e-4766-aeee-f8b9956fb9f6",
               "id": "595",
               "name": "What's the best way to visualize high-dimensional data? - Quora",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.quora.com/Whats-the-best-way-to-visualize-high-dimensional-data"
            }, {
               "children": [ {
                  "date_added": "13063903192038165",
                  "guid": "00c405de-217c-4d1a-a384-cb8893a98a8e",
                  "id": "629",
                  "meta_info": {
                     "last_visited_desktop": "13199588765884623"
                  },
                  "name": "GPU Gems - Chapter 19. Generic Refraction Simulation",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://http.developer.nvidia.com/GPUGems2/gpugems2_chapter19.html"
               }, {
                  "date_added": "13063903473589063",
                  "guid": "bc3dfb14-86db-45ea-b6bd-c03b8629afd3",
                  "id": "630",
                  "name": "Thick Glass with Floating-Point Textures at The Little Grasshopper",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://prideout.net/blog/?p=51"
               } ],
               "date_added": "13063903180702191",
               "date_modified": "13125459723793883",
               "guid": "ef87a599-7511-4fc6-8ac8-a40f6dbcfb90",
               "id": "628",
               "name": "Refraction",
               "sync_transaction_version": "1",
               "type": "folder"
            }, {
               "date_added": "13064264394434919",
               "guid": "c40120ac-763c-440f-9b12-aff5f02b0c02",
               "id": "631",
               "name": "pgbovine.net/publications/Online-Python-Tutor-web-based-program-visualization_SIGCSE-2013.pdf",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://pgbovine.net/publications/Online-Python-Tutor-web-based-program-visualization_SIGCSE-2013.pdf"
            }, {
               "date_added": "13064264852233663",
               "guid": "30adabaa-3832-4a65-9694-3c1f32f97c95",
               "id": "633",
               "name": "www.pgbovine.net/publications/direct-manipulation-language-for-algorithms_VLHCC-2014.pdf",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.pgbovine.net/publications/direct-manipulation-language-for-algorithms_VLHCC-2014.pdf"
            }, {
               "date_added": "13064452528111228",
               "guid": "064cc70c-ada2-4ac7-aa12-b7aeda5a64c7",
               "id": "634",
               "name": "Make It Stick: The Science of Successful Learning: Peter C. Brown, Henry L. Roediger III, Mark A. McDaniel: 9780674729018: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Make-It-Stick-Successful-Learning/dp/0674729013#customerReviews"
            }, {
               "date_added": "13064633452685384",
               "guid": "62047735-8b55-4274-87e5-4afa5ba574df",
               "id": "635",
               "name": "Bitmap Font Generator - Documentation",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.angelcode.com/products/bmfont/doc/file_format.html"
            }, {
               "date_added": "13064633459970677",
               "guid": "1a7908f9-318e-4f80-8caa-b011458b94ca",
               "id": "636",
               "name": "Distance field fonts · libgdx/libgdx Wiki",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/libgdx/libgdx/wiki/Distance-field-fonts"
            }, {
               "date_added": "13071202532228000",
               "guid": "1eaf57f5-90cc-4a60-9993-724e06776f2f",
               "id": "714",
               "name": "Why Geometry Shaders Are Slow (Unless you’re Intel)",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.joshbarczak.com/blog/?p=667"
            }, {
               "date_added": "13072135976364925",
               "guid": "ee2c5413-e521-4105-857d-ab2864eac1df",
               "id": "722",
               "name": "Handbook of Graph Drawing and Visualization",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://cs.brown.edu/~rt/gdhandbook/"
            }, {
               "date_added": "13073304948419000",
               "guid": "807fb878-2479-426d-bd3f-d472b85eb305",
               "id": "739",
               "name": "goertzel.org/ECAN_v3.pdf",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://goertzel.org/ECAN_v3.pdf"
            }, {
               "date_added": "13074486871483000",
               "guid": "b6da732c-8679-4253-a7d3-b132c34e8c03",
               "id": "757",
               "name": "Verlet integration - Wikipedia, the free encyclopedia",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://en.wikipedia.org/wiki/Verlet_integration"
            }, {
               "date_added": "13077133350627000",
               "guid": "53c90069-19d4-4be1-9e03-178fd65eae23",
               "id": "774",
               "name": "Drawing Lines is Hard",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://mattdesl.svbtle.com/drawing-lines-is-hard"
            }, {
               "date_added": "13125474062626130",
               "guid": "e03c7c3d-f5da-466a-87d5-5537a40d2fad",
               "id": "870",
               "name": "JIVE - Tutorials",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.cse.buffalo.edu/jive/news.html"
            }, {
               "date_added": "13125613334868645",
               "guid": "688ad077-a1ea-464d-a73b-5b0ecf1f5599",
               "id": "872",
               "name": "Graph operations - Wikipedia",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://en.wikipedia.org/wiki/Graph_operations"
            }, {
               "date_added": "13128386489167331",
               "guid": "5bf4aba4-ce36-4d28-bb95-b84b9d9b443a",
               "id": "888",
               "meta_info": {
                  "last_visited_desktop": "13194833370702474"
               },
               "name": "Java Debug Interface docs",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://docs.oracle.com/javase/7/docs/jdk/api/jpda/jdi/"
            }, {
               "date_added": "13132810657180441",
               "guid": "eed4dbf9-6c1a-4188-b9d3-22d8fa10498c",
               "id": "921",
               "meta_info": {
                  "last_visited_desktop": "13132810657185064"
               },
               "name": "https://llimllib.github.io/pymag-trees/",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://llimllib.github.io/pymag-trees/"
            }, {
               "date_added": "13143490803810172",
               "guid": "5373a476-f5de-4bfe-a426-c81e7e1b927a",
               "id": "953",
               "meta_info": {
                  "last_visited_desktop": "13143490803821155"
               },
               "name": "GianlucaGuarini/icaro: Smart and efficient javascript object observer, ideal for batching DOM updates (~1kb)",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/GianlucaGuarini/icaro"
            }, {
               "date_added": "13144006392033064",
               "guid": "5b358d56-9c14-44f5-8f29-81f74195f34e",
               "id": "956",
               "meta_info": {
                  "last_visited_desktop": "13144006392035521"
               },
               "name": "Dwarf Home",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.dwarfstd.org/"
            }, {
               "date_added": "13144012317493240",
               "guid": "95a59f64-60b3-4db3-a3c7-5407a7497b62",
               "id": "957",
               "meta_info": {
                  "last_visited_desktop": "13144012317495228"
               },
               "name": "Cool project, with beautiful presentation! I'm working on something similar, wi... | Hacker News",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://news.ycombinator.com/item?id=14725355"
            }, {
               "date_added": "13144186630709712",
               "guid": "2fcf3918-1512-4536-be22-948de519246e",
               "id": "958",
               "meta_info": {
                  "last_visited_desktop": "13144186630743837"
               },
               "name": "Kibana: Explore, Visualize, Discover Data | Elastic",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.elastic.co/products/kibana"
            }, {
               "date_added": "13144349616093754",
               "guid": "d9a23b19-08ee-4acb-8302-c2dab84f7461",
               "id": "959",
               "meta_info": {
                  "last_visited_desktop": "13145573060146548"
               },
               "name": "Postgres listen/notify example",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://gist.github.com/fritzy/5db6221bebe53eda4c2d"
            }, {
               "children": [ {
                  "date_added": "13144447928308924",
                  "guid": "7542033f-9a95-483c-a478-d8126e8f00d2",
                  "id": "964",
                  "meta_info": {
                     "last_visited_desktop": "13144447928310121"
                  },
                  "name": "DMG Canvas - Disk Image Layout and Building for Mac OS X",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://www.araelium.com/dmgcanvas"
               }, {
                  "date_added": "13144447936401833",
                  "guid": "b4c6da58-a16e-4b7a-aa83-1753cecfd73e",
                  "id": "965",
                  "meta_info": {
                     "last_visited_desktop": "13144447936402948"
                  },
                  "name": "Self-Contained Application Packaging",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://docs.oracle.com/javase/8/docs/technotes/guides/deploy/self-contained-packaging.html"
               }, {
                  "date_added": "13144447940944051",
                  "guid": "2db2da2d-9b99-4a37-9992-271e078ac3cb",
                  "id": "966",
                  "meta_info": {
                     "last_visited_desktop": "13144447940945052"
                  },
                  "name": "How to create a 'DMG Installer' for Mac OS X",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://gist.github.com/jadeatucker/5382343"
               }, {
                  "date_added": "13144447944870576",
                  "guid": "46cb7cab-2904-477d-ae1a-e452b6178c87",
                  "id": "967",
                  "meta_info": {
                     "last_visited_desktop": "13144447944871605"
                  },
                  "name": "How to create installation DMG files in OS X – Mohammad M. Ramezanpour",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://ramezanpour.net/post/2014/05/12/how-to-create-installation-dmg-files-in-os-x/"
               } ],
               "date_added": "13144447918708743",
               "date_modified": "13206240216469767",
               "guid": "c0e75b23-0b40-444a-b2b8-c3e232b170c5",
               "id": "963",
               "name": "Installation",
               "sync_transaction_version": "1",
               "type": "folder"
            }, {
               "date_added": "13144965135459611",
               "guid": "bc8f4e3b-d714-4f1b-9c47-cfd0c1c861a8",
               "id": "970",
               "meta_info": {
                  "last_visited_desktop": "13144965135636399"
               },
               "name": "Tidy Tree - bl.ocks.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://bl.ocks.org/mbostock/4339184"
            }, {
               "date_added": "13144967285615171",
               "guid": "6de4adfd-06b9-42e9-a8bb-fff08aedecde",
               "id": "971",
               "meta_info": {
                  "last_visited_desktop": "13144967285616615"
               },
               "name": "Venture capital is a hell of a drug | TechCrunch",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://techcrunch.com/2016/09/16/venture-capital-is-a-hell-of-a-drug/"
            }, {
               "date_added": "13150758101398201",
               "guid": "75d0fdff-e4e6-478b-8acf-740c7242e072",
               "id": "996",
               "meta_info": {
                  "last_visited_desktop": "13150758101419156"
               },
               "name": "Publications | Visual Computing Group - Prof. Dr. Oliver Deussen",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://graphics.uni-konstanz.de/publikationen/index.html#y2007"
            }, {
               "date_added": "13155184829207862",
               "guid": "12de3a4b-ea69-48b1-89e7-500b4bad5e30",
               "id": "1027",
               "meta_info": {
                  "last_visited_desktop": "13155184829218896"
               },
               "name": "traceglMPL/tracegl: TraceGL MPL release",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/traceglMPL/tracegl"
            }, {
               "date_added": "13167949510943100",
               "guid": "2a49680b-2175-4d39-9783-02a150bd7f49",
               "id": "1076",
               "meta_info": {
                  "last_visited_desktop": "13167949510966947"
               },
               "name": "Bvckup 2 | Development notes | 10042018",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://bvckup2.com/wip/10042018"
            }, {
               "date_added": "13179416668974779",
               "guid": "1154febf-2f8c-4b81-8940-998828d2f8b5",
               "id": "1165",
               "meta_info": {
                  "last_visited_desktop": "13179416668977083"
               },
               "name": "Becoming fully reactive: an in-depth explanation of MobX",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://hackernoon.com/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254"
            }, {
               "children": [ {
                  "date_added": "13181013413812672",
                  "guid": "bec635f9-272f-4bde-a610-cb9bf2f4f965",
                  "id": "1179",
                  "meta_info": {
                     "last_visited_desktop": "13181779538659891"
                  },
                  "name": "cola.js: Constraint-based Layout in the Browser",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://ialab.it.monash.edu/webcola/"
               }, {
                  "date_added": "13182556183982713",
                  "guid": "b8b37a9f-4cd7-4dd5-b6a9-aa512269fc88",
                  "id": "1193",
                  "meta_info": {
                     "last_visited_desktop": "13182556184133759"
                  },
                  "name": "Beautiful Decisions: Inside BigML’s Decision Trees | The Official Blog of BigML.com",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://blog.bigml.com/2012/01/23/beautiful-decisions-inside-bigmls-decision-trees/"
               }, {
                  "date_added": "13193704387127148",
                  "guid": "e5d88079-a1fc-45dc-a699-6810f678a4d9",
                  "id": "1306",
                  "meta_info": {
                     "last_visited_desktop": "13193704387149315"
                  },
                  "name": "Improve graph layout · Issue #1 · rgleichman/glance",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://github.com/rgleichman/glance/issues/1"
               } ],
               "date_added": "13181013445300330",
               "date_modified": "13193704633907508",
               "guid": "bd09f3af-5a4a-44dd-9961-31dfd3d2956c",
               "id": "1180",
               "name": "layout algos",
               "sync_transaction_version": "1",
               "type": "folder"
            }, {
               "date_added": "13193977733101790",
               "guid": "d54e1f92-06a3-4c14-96a3-817de3690b70",
               "id": "1311",
               "meta_info": {
                  "last_visited_desktop": "13193977733123693"
               },
               "name": "Tree Visualization Techniques",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://keshif.me/demo/treevis.html"
            }, {
               "date_added": "13194828320736782",
               "guid": "fd236f70-750b-428d-8218-18bca76c6deb",
               "id": "1318",
               "meta_info": {
                  "last_visited_desktop": "13194828320740767"
               },
               "name": "Digging For Data Structures",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.usenix.org/legacy/event/osdi08/tech/full_papers/cozzie/cozzie_html/index.html"
            }, {
               "date_added": "13194829246390596",
               "guid": "c8c4c078-1424-4c33-be18-03b63e00c781",
               "id": "1319",
               "meta_info": {
                  "last_visited_desktop": "13194829246394145"
               },
               "name": "Dynamic Shape and Data Structure Analysis in Java - Semantic Scholar",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.semanticscholar.org/paper/Dynamic-Shape-and-Data-Structure-Analysis-in-Java-Pheng-Verbrugge/244736450658f35409818fbb025607a203bf0064"
            }, {
               "date_added": "13195609277595165",
               "guid": "b883bc45-7dd9-4289-b9f2-071afff6a0aa",
               "id": "1341",
               "meta_info": {
                  "last_visited_desktop": "13195609277597456"
               },
               "name": "(application idea) Apache TinkerPop",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://tinkerpop.apache.org/"
            }, {
               "children": [ {
                  "date_added": "13196459638485729",
                  "guid": "96aed791-c476-4576-8249-9c890cd8f1a6",
                  "id": "1359",
                  "meta_info": {
                     "last_visited_desktop": "13196459638487996"
                  },
                  "name": "cztomsik/node-webrender: Webrender bindings for node.js & react",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://github.com/cztomsik/node-webrender#requirements"
               }, {
                  "date_added": "13196461061092370",
                  "guid": "9aaf7ebd-7a93-422f-8ee4-771f582ae155",
                  "id": "1360",
                  "meta_info": {
                     "last_visited_desktop": "13196461061093331"
                  },
                  "name": "kotlin-graphics/imgui: Bloat-free Immediate Mode Graphical User interface for JVM with minimal dependencies (rewrite of dear imgui)",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://github.com/kotlin-graphics/imgui"
               } ],
               "date_added": "13196459666444392",
               "date_modified": "13196513707913523",
               "guid": "7808f8e7-242d-476d-8691-288380b85fe0",
               "id": "1357",
               "name": "ui",
               "sync_transaction_version": "1",
               "type": "folder"
            }, {
               "date_added": "13196499434476991",
               "guid": "5168daeb-4c5b-4f16-a170-a86f3fa81a04",
               "id": "1358",
               "meta_info": {
                  "last_visited_desktop": "13196839595664389"
               },
               "name": "REBL - Stuart Halloway - YouTube",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.youtube.com/watch?v=c52QhiXsmyI&feature=youtu.be&t=720"
            }, {
               "date_added": "13196734307517664",
               "guid": "f8130347-3d4b-4df5-a84e-1caf798eefca",
               "id": "1361",
               "meta_info": {
                  "last_visited_desktop": "13196734307518567"
               },
               "name": "PANE: Programming with visible data",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://joshuahhh.com/projects/pane/"
            } ],
            "date_added": "13061820156355851",
            "date_modified": "13196734310949075",
            "guid": "eef961fb-56d0-411e-8cb8-9ed6799d0f2f",
            "id": "588",
            "name": "Lucidity",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13152000536319048",
               "guid": "85d31e11-5a92-444e-a4bc-7d2aa61fe993",
               "id": "1006",
               "meta_info": {
                  "last_visited_desktop": "13152000536325660"
               },
               "name": "Understanding Convolutional Neural Networks for NLP – WildML",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.wildml.com/2015/11/understanding-convolutional-neural-networks-for-nlp/"
            }, {
               "date_added": "13152000547006600",
               "guid": "dbd00bec-a2b8-4727-8727-137d44b2c516",
               "id": "1007",
               "meta_info": {
                  "last_visited_desktop": "13152000547010840"
               },
               "name": "An Intuitive Explanation of Convolutional Neural Networks – the data science blog",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://ujjwalkarn.me/2016/08/11/intuitive-explanation-convnets/"
            }, {
               "date_added": "13154409600005285",
               "guid": "cb54cd3a-0507-47eb-a844-e56da80f4e6d",
               "id": "1023",
               "meta_info": {
                  "last_visited_desktop": "13154409600009346"
               },
               "name": "But what *is* a Neural Network? | Deep learning, chapter 1 - YouTube",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.youtube.com/watch?v=aircAruvnKk"
            }, {
               "date_added": "13161819021781763",
               "guid": "fbf5d939-06b3-45d3-9ddf-5b0772aa2b3d",
               "id": "1057",
               "meta_info": {
                  "last_visited_desktop": "13182472208277881"
               },
               "name": "parrt.cs.usfca.edu/doc/matrix-calculus/index.html",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://parrt.cs.usfca.edu/doc/matrix-calculus/index.html"
            }, {
               "date_added": "13182474564094559",
               "guid": "4752b3f7-8dec-4fb3-9197-249c1a44aaee",
               "id": "1190",
               "meta_info": {
                  "last_visited_desktop": "13187503872552250"
               },
               "name": "Neural networks and deep learning",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://neuralnetworksanddeeplearning.com/about.html"
            }, {
               "date_added": "13182474582150518",
               "guid": "2df9cde0-f9a4-4544-9e38-511a65266a03",
               "id": "1191",
               "meta_info": {
                  "last_visited_desktop": "13182474582164833"
               },
               "name": "The matrix calculus you need for deep learning",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://explained.ai/matrix-calculus/index.html"
            }, {
               "date_added": "13182475173177600",
               "guid": "3650781d-1ec2-4f8b-86b6-e50a920cdb58",
               "id": "1192",
               "meta_info": {
                  "last_visited_desktop": "13182475173191859"
               },
               "name": "(Parr) The Mechanics of Machine Learning",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://mlbook.explained.ai/"
            }, {
               "date_added": "13184456923455966",
               "guid": "58fb2cc0-c2cf-48f1-9b00-71e361ae04d9",
               "id": "1220",
               "meta_info": {
                  "last_visited_desktop": "13184456923466943"
               },
               "name": "PCA and ICA: Identifying combinations of variables -- Gaël Varoquaux: computer / data / brain science",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://gael-varoquaux.info/science/ica_vs_pca.html"
            }, {
               "date_added": "13184909557741765",
               "guid": "a7c0a10c-31bf-4b26-89d9-cecff474456d",
               "id": "1227",
               "meta_info": {
                  "last_visited_desktop": "13184909557742709"
               },
               "name": "(Nice video lecture series)Deep Learning and Reinforcement Learning Summer School, Toronto 2018 - VideoLectures - VideoLectures.NET",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://videolectures.net/DLRLsummerschool2018_toronto/"
            }, {
               "date_added": "13184973693718257",
               "guid": "338b1896-71b3-4261-8bfc-04e36c888f9c",
               "id": "1228",
               "meta_info": {
                  "last_visited_desktop": "13184973693719550"
               },
               "name": "Deep_Learning_Project-Pytorch",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://spandan-madan.github.io/DeepLearningProject/docs/Deep_Learning_Project-Pytorch.html"
            }, {
               "date_added": "13202340690487957",
               "guid": "bcf080c0-6eb7-4883-b93f-35607aa3c6f2",
               "id": "1395",
               "meta_info": {
                  "last_visited_desktop": "13202340690507324"
               },
               "name": "Understanding LSTM Networks -- colah's blog",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://colah.github.io/posts/2015-08-Understanding-LSTMs/"
            } ],
            "date_added": "13152000510854569",
            "date_modified": "13203240860440449",
            "guid": "4dc51835-79eb-471b-9896-742475f87ff1",
            "id": "1005",
            "name": "Machine Learning",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13074375609007000",
               "guid": "9dc69402-2985-4afb-9337-894a54c8648a",
               "id": "752",
               "name": "Documentation - Materialize",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://materializecss.com/?"
            }, {
               "date_added": "13074380627860000",
               "guid": "791e2a5b-95eb-4901-9238-b706373aea90",
               "id": "753",
               "name": "mikera/clojure-utils",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/mikera/clojure-utils"
            }, {
               "date_added": "13075667985258000",
               "guid": "ac2918ed-8023-426d-baa3-faca6c7be159",
               "id": "767",
               "name": "A re-introduction to JavaScript (JS tutorial) - JavaScript | MDN",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript"
            }, {
               "date_added": "13076784500772000",
               "guid": "d2acffb7-4a46-44f9-802c-d44f1def4f7c",
               "id": "773",
               "name": "re-com Demo",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://re-demo.s3-website-ap-southeast-2.amazonaws.com/#/h-box"
            }, {
               "date_added": "13132015800600628",
               "guid": "d6542b92-1921-44db-97bb-6d230dbeb23f",
               "id": "909",
               "meta_info": {
                  "last_visited_desktop": "13132198081434802"
               },
               "name": "Technology Stacks at Real Companies | StackShare",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://stackshare.io/"
            }, {
               "date_added": "13144782353600297",
               "guid": "b02460fa-3c02-4b8b-b063-baf941c26df3",
               "id": "968",
               "meta_info": {
                  "last_visited_desktop": "13144782353647513"
               },
               "name": "Learn Nude React - no NPM, no Webpack, no Redux, no Router",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://reactarmory.com/guides/learn-nude-react"
            }, {
               "date_added": "13145040412520333",
               "guid": "4dd6ab2d-8e5b-46b9-820a-96a07c0bcbb7",
               "id": "972",
               "meta_info": {
                  "last_visited_desktop": "13145040412568885"
               },
               "name": "8 things to learn in React before using Redux - RWieruch",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.robinwieruch.de/learn-react-before-using-redux/"
            }, {
               "date_added": "13147638419672394",
               "guid": "cd737e0d-1d1a-4ef1-84ad-e025d5a96d34",
               "id": "989",
               "meta_info": {
                  "last_visited_desktop": "13147638419696440"
               },
               "name": "SAP/chevrotain: JavaScript Parsing DSL",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/SAP/chevrotain"
            }, {
               "date_added": "13161997198220111",
               "guid": "f912da29-91ed-4ee5-a687-b43bb5b08f0d",
               "id": "1058",
               "meta_info": {
                  "last_visited_desktop": "13190365887330478"
               },
               "name": "The introduction to Reactive Programming you've been missing",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://gist.github.com/staltz/868e7e9bc2a7b8c1f754"
            }, {
               "date_added": "13163718126608749",
               "guid": "11b1bfa8-b0a0-4b1f-a721-5b3795bc8edf",
               "id": "1063",
               "meta_info": {
                  "last_visited_desktop": "13163718126629327"
               },
               "name": "Some Notes About How I Write Haskell",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://blog.infinitenegativeutility.com/2017/12/some-notes-about-how-i-write-haskell"
            }, {
               "date_added": "13165789247719277",
               "guid": "894d09f8-2a38-4feb-bc09-fa0cb6f04447",
               "id": "1072",
               "meta_info": {
                  "last_visited_desktop": "13165789247733719"
               },
               "name": "gregwebs/StateTree: javascript statechart implementation",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/gregwebs/StateTree"
            }, {
               "date_added": "13196920947891090",
               "guid": "e3e56051-7345-4b30-9bdb-75ab0bd58a89",
               "id": "1362",
               "meta_info": {
                  "last_visited_desktop": "13199427827895606"
               },
               "name": "drcmda/react-three-fiber: 👌A React-renderer for Three.js",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/drcmda/react-three-fiber"
            } ],
            "date_added": "13074375564949809",
            "date_modified": "13196920947891090",
            "guid": "a9131b01-60ca-4150-9e8e-07921b01e877",
            "id": "751",
            "name": "Langs, Libs, Frameworks",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13109049708521318",
               "guid": "28e1ad03-3994-48b9-8cf7-f94a7fe79d42",
               "id": "820",
               "meta_info": {
                  "last_visited_desktop": "13132278243945385"
               },
               "name": "[Free] HandPainted Plants 2 | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/free-handpainted-plants-2"
            }, {
               "date_added": "13109049736689580",
               "guid": "b745abe4-3fe8-4f0b-877e-d85fc2468cf2",
               "id": "822",
               "name": "3D (rigged) characters | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/3d-rigged-characters"
            }, {
               "date_added": "13109049743031343",
               "guid": "0d91bbfc-e5d9-41b6-a863-7f27cea787ac",
               "id": "823",
               "name": "PigArt Tree | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/pigart-tree"
            }, {
               "date_added": "13109370071605556",
               "guid": "4133efae-b70e-4696-afb7-74e1f987aac7",
               "id": "826",
               "name": "Dumpster (3 cubic yard capacity) | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/dumpster-3-cubic-yard-capacity"
            }, {
               "date_added": "13109372375514764",
               "guid": "49293fea-f465-4ba6-a081-91459fc36824",
               "id": "827",
               "name": "Low-poly Skyscraper | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/low-poly-skyscraper"
            } ],
            "date_added": "13109049734012349",
            "date_modified": "13109372375514764",
            "guid": "d66cbeff-03db-4f74-afe7-619ccd4ea6c1",
            "id": "821",
            "name": "threejs game",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13132103443650022",
               "guid": "5f6883a9-afdb-4a47-9f97-c5e6a29fbc5d",
               "id": "910",
               "meta_info": {
                  "last_visited_desktop": "13132278253987263"
               },
               "name": "Low Poly Free 3D Models and Game Textures, VR & AR Optimized",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://shop.bitgem3d.com/"
            }, {
               "date_added": "13132103830600118",
               "guid": "e8583919-b008-47bc-89df-2125e07bb220",
               "id": "912",
               "meta_info": {
                  "last_visited_desktop": "13145771618913853"
               },
               "name": "Newsfeed - Sketchfab",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://sketchfab.com/"
            } ],
            "date_added": "13132103482764267",
            "date_modified": "13132103830600118",
            "guid": "dc50c796-bc05-46ca-944c-323d3ee2f9da",
            "id": "911",
            "name": "Game resources",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "12901621279000000",
               "guid": "5125c546-9fa5-4328-850f-d3265078ecde",
               "id": "359",
               "name": "PANDA-gGo",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://panda-igs.joyjoy.net/java/gGo/"
            }, {
               "date_added": "12908025331000000",
               "guid": "b6275e04-aecd-496f-bf13-63016adebaf7",
               "id": "360",
               "name": "goproblems.com Home",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.goproblems.com/"
            }, {
               "date_added": "12908249865000000",
               "guid": "0d362702-c1ec-4132-8d6b-70e59f4f8f0b",
               "id": "361",
               "name": "Welcome to the American Go Association",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.usgo.org/index.html"
            }, {
               "date_added": "12908275402000000",
               "guid": "35244836-63a3-4f9d-85f1-f2b9c6038a66",
               "id": "362",
               "name": "Prospector - graded go problems for beginners",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://prospector.coalliance.org/search~S0?/aKano+Yoshinori/akano+yoshinori/1,1,1,B/detlframeset&FF=akano+yoshinori&1,1,"
            }, {
               "date_added": "12908275508000000",
               "guid": "b333cec1-8c46-4593-a3f3-7627f8f53093",
               "id": "363",
               "name": "Go Bibliography",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.gobooks.info/"
            }, {
               "date_added": "12908287887000000",
               "guid": "a87084e0-43bd-4f00-932c-5d3ae31021be",
               "id": "364",
               "name": "Sensei's Library: Pages for Beginners",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://senseis.xmp.net/?PagesForBeginners"
            }, {
               "date_added": "12910342782000000",
               "guid": "e6976398-7f8c-43a5-a5d4-2baa6ab3c18e",
               "id": "365",
               "name": "How Not to Play Go",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.slateandshell.com/SSYZ011.html"
            }, {
               "date_added": "12938609406000000",
               "guid": "6f50a410-36c2-450d-a1e3-d6c94e75a739",
               "id": "366",
               "name": "Go Commentary | Greatest Games Ever Played 01: Fujisawa Kuranosuke vs Go Seigen",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.gocommentary.com/free-videos/greatest-games-ever-played-01-fujisawa-kuranosuke-vs-go-seigen.html"
            }, {
               "date_added": "12908025396000000",
               "guid": "4ca51389-e43e-4bef-aa40-8f387dc4e12d",
               "id": "367",
               "name": "Sensei's Library: Beginners' Guide to Go Problems",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://senseis.xmp.net/?BeginnersGuideToTsumego"
            }, {
               "date_added": "12941374338000000",
               "guid": "78e99d37-2af2-4973-9ae5-9d4539594535",
               "id": "368",
               "name": "Amazon.com: Tesuji (9784906574124): James Davies, Richard Bozulich: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Tesuji-James-Davies/dp/4906574122/ref=pd_ys_home_shvl_1"
            } ],
            "date_added": "12953862981750000",
            "date_modified": "13125531742467561",
            "guid": "4c7b9263-9cc2-45c1-8701-91e907a823d4",
            "id": "213",
            "name": "GO",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "12914837832000000",
               "guid": "8e87e80d-f916-4086-8f0b-95c3beb3b820",
               "id": "313",
               "name": "Project Euler",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://projecteuler.net/index.php?section=problems"
            }, {
               "date_added": "12914837971000000",
               "guid": "bf507751-13ab-434a-a193-31988cc4df46",
               "id": "314",
               "name": "mathschallenge.net",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://mathschallenge.net/index.php?section=faq"
            }, {
               "date_added": "12914840436000000",
               "guid": "e0f7b6c7-9502-4157-8dd7-5ca075994b1e",
               "id": "315",
               "name": "Amazon.com: The Annotated Turing: A Guided Tour Through Alan Turing's Historic Paper on Computability and the Turing Machine (9780470229057): Charles Petzold: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Annotated-Turing-Through-Historic-Computability/dp/0470229055/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "12914842059000000",
               "guid": "34142aee-1450-49fd-a008-61e780ba5657",
               "id": "316",
               "name": "Amazon.com: The Four Pillars of Geometry (Undergraduate Texts in Mathematics) (9780387255309): John Stillwell: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Pillars-Geometry-Undergraduate-Texts-Mathematics/dp/0387255303/ref=sr_1_2?ie=UTF8&s=books&qid=1270364650&sr=8-2"
            }, {
               "date_added": "12939428606000000",
               "guid": "d9d96139-49cb-4e0d-802a-e06083543564",
               "id": "317",
               "name": "Amazon.com: The Princeton Companion to Mathematics (9780691118802): Timothy Gowers, June Barrow-Green, Imre Leader: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/exec/obidos/ASIN/0691118809/antoniocangia-20/ref=nosim/"
            }, {
               "date_added": "12914894233000000",
               "guid": "be8a13d5-5aca-4260-9d10-524e4c18eb80",
               "id": "318",
               "name": "Amazon.com: Journey through Genius: The Great Theorems of Mathematics (9780140147391): William Dunham: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Journey-through-Genius-Theorems-Mathematics/dp/014014739X/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "12914993094000000",
               "guid": "b03640af-56cb-4e5a-a051-9589e3b266ef",
               "id": "319",
               "name": "Amazon.com: Mathematical Logic (9780486425337): Stephen Cole Kleene: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Mathematical-Logic-Stephen-Cole-Kleene/dp/0486425339/ref=pd_bxgy_b_img_b"
            }, {
               "date_added": "12938345075000000",
               "guid": "752523d9-55ac-47c4-a1aa-5a5cff591426",
               "id": "320",
               "name": "Amazon.com: Introduction to Calculus and Analysis, Vol. 1 (Classics in Mathematics) (9783540650584): Richard Courant, Fritz John: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Introduction-Calculus-Analysis-Classics-Mathematics/dp/354065058X/ref=sr_1_1?s=books&ie=UTF8&qid=1293871116&sr=1-1"
            }, {
               "date_added": "12938345156000000",
               "guid": "37d301d6-85d7-4ad4-9ec8-95b7cce20755",
               "id": "321",
               "name": "Amazon.com: Differential and Integral Calculus, Vol. 1 (Volume 1) (9780471608424): Richard Courant: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Differential-Integral-Calculus-Richard-Courant/dp/0471608424/ref=sr_1_5?s=books&ie=UTF8&qid=1293871116&sr=1-5"
            }, {
               "date_added": "12938348298000000",
               "guid": "1e1eb9c3-f461-416d-a89e-4c33e1d76ce8",
               "id": "322",
               "name": "Amazon.com: Calculus with Analytic Geometry (9780871501868): Earl William Swokowski: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Calculus-Analytic-Geometry-William-Swokowski/dp/0871501864/ref=ntt_at_ep_dpt_9"
            }, {
               "date_added": "12938778767000000",
               "guid": "b14a2616-eb37-4369-8728-beb7c553449d",
               "id": "323",
               "name": "Amazon.com: The Higher Arithmetic: An Introduction to the Theory of Numbers (9780521722360): H. Davenport: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Higher-Arithmetic-Introduction-Theory-Numbers/dp/0521722365/ref=sr_1_1?s=books&ie=UTF8&qid=1294304517&sr=1-1"
            }, {
               "date_added": "12939212430000000",
               "guid": "b18159d8-dcb6-4447-8b33-b187afdc7235",
               "id": "324",
               "name": "Amazon.com: A Profile of Mathematical Logic (Dover Books on Mathematics) (9780486434759): Howard DeLong: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Profile-Mathematical-Logic-Dover-Mathematics/dp/0486434753/ref=sr_1_1?ie=UTF8&s=books&qid=1294737978&sr=1-1"
            }, {
               "date_added": "12939429959000000",
               "guid": "a90dbb69-1fb0-4523-90ae-def5ae712d84",
               "id": "325",
               "name": "Amazon.com: Visual Complex Analysis (9780198534464): Tristan Needham: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Visual-Complex-Analysis-Tristan-Needham/dp/0198534469/ref=sr_1_1?s=books&ie=UTF8&qid=1294955974&sr=1-1"
            }, {
               "date_added": "12939430160000000",
               "guid": "ec1ea060-940a-4e70-877d-a869751b05af",
               "id": "326",
               "name": "Amazon.com: The Road to Reality: A Complete Guide to the Laws of the Universe (9780679776314): Roger Penrose: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/0679776311/ref=cm_cr_asin_lnk"
            }, {
               "date_added": "12938346741000000",
               "guid": "674996b0-62c3-4b25-986b-ea655bbc10fb",
               "id": "327",
               "name": "Amazon.com: Introduction to the Theory of Computation (9780534947286): Michael Sipser: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Introduction-Theory-Computation-Michael-Sipser/dp/053494728X/ref=tmm_hrd_title_1?ie=UTF8&qid=1293872883&sr=1-1"
            }, {
               "date_added": "12939472606000000",
               "guid": "6f72b446-5673-450e-a034-4eb95cb61df1",
               "id": "328",
               "name": "Vi Hart: Math Doodling",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://vihart.com/doodling/"
            }, {
               "date_added": "12939723519000000",
               "guid": "e15ec39a-5be6-45ac-9d4c-897dbc6f2300",
               "id": "329",
               "name": "Amazon.com: Set Theory and the Continuum Hypothesis (Dover Books on Mathematics) (9780486469218): Paul J. Cohen: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Theory-Continuum-Hypothesis-Dover-Mathematics/dp/0486469212/ref=pd_rhf_shvl_2"
            }, {
               "date_added": "12939724464000000",
               "guid": "471792e0-3697-41e1-963f-0c0982bb4c61",
               "id": "330",
               "name": "Amazon.com: On Numbers and Games (9781568811277): John H. Conway: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Numbers-Games-John-H-Conway/dp/1568811276/ref=ntt_at_ep_dpt_4"
            }, {
               "date_added": "12939732096000000",
               "guid": "73333bbe-adbe-4843-b7e2-c6b0ef224181",
               "id": "331",
               "name": "Amazon.com: Modern Geometry - Methods and Applications: Part I: The Geometry of Surfaces, Transformation Groups, and Fields (Graduate Texts in Mathematics) (Pt. 1) (9780387976631): B.A. Dubrovin, A.T. Fomenko, S.P. Novikov, R.G. Burns: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Modern-Geometry-Applications-Transformation-Mathematics/dp/0387976639/ref=sr_1_2?s=books&ie=UTF8&qid=1295257971&sr=1-2"
            }, {
               "date_added": "12939732327000000",
               "guid": "5cc6dc79-435f-4d81-b971-fa30de34c369",
               "id": "332",
               "name": "Amazon.com: Visual Group Theory (MAA Classroom Resource Materials) (MAA Problem Book Series) (9780883857571): Nathan Carter: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Visual-Classroom-Resource-Materials-Problem/dp/088385757X/ref=pd_sim_b_5"
            }, {
               "date_added": "12939732665000000",
               "guid": "f4d5bcce-3214-4359-971c-7c153894020d",
               "id": "333",
               "name": "Amazon.com: A Book of Abstract Algebra: Second Edition (9780486474175): Charles C Pinter: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Book-Abstract-Algebra-Second/dp/0486474178/ref=pd_cp_b_1"
            }, {
               "date_added": "12939732695000000",
               "guid": "17af479f-e41e-4931-9f73-5fc55d6ecded",
               "id": "334",
               "name": "Amazon.com: Groups and Their Graphs (New Mathematical Library 14) (9780883856147): Israel Grossman, Wilhelm Magnus: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Groups-Their-Graphs-Mathematical-Library/dp/088385614X/ref=sr_1_1?ie=UTF8&qid=1295258688&sr=8-1"
            }, {
               "date_added": "12939732900000000",
               "guid": "c54fe0f2-c71c-4811-92f3-b0177b938ab0",
               "id": "335",
               "name": "Amazon.com: An Introduction to the Theory of Numbers (9780199219865): G. H. Hardy, Edward M. Wright, Andrew Wiles, Roger Heath-Brown, Joseph Silverman: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Introduction-Theory-Numbers-G-Hardy/dp/0199219869/ref=pd_sim_b_1"
            }, {
               "date_added": "12940073290000000",
               "guid": "17d078ab-b494-4211-8f7d-0f4eff16a531",
               "id": "336",
               "name": "Amazon.com: Lecture Notes on Elementary Topology and Geometry (Undergraduate Texts in Mathematics) (9780387902029): I. M. Singer, J. A. Thorpe: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/0387902023/ref=cm_cr_asin_lnk"
            }, {
               "date_added": "12940073436000000",
               "guid": "eb39c828-2863-4213-9d70-d3990067b962",
               "id": "337",
               "name": "Amazon.com: Mathematics: Its Content, Methods and Meaning (9780486409160): A. D. Aleksandrov, A. N. Kolmogorov, M. A. Lavrent'ev: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/gp/product/0486409163/ref=cm_cr_asin_lnk"
            }, {
               "date_added": "12940332445000000",
               "guid": "4e448c9c-8652-46b1-90a3-21bb17907b01",
               "id": "338",
               "name": "Amazon.com: Numbers and Functions: Steps into Analysis (9780521788366): R. P. Burn: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Numbers-Functions-Steps-into-Analysis/dp/0521788366/ref=pd_sim_b_2"
            }, {
               "date_added": "12940521389000000",
               "guid": "b68b0b7b-fc51-4a72-b7a8-6d070e30e0a5",
               "id": "339",
               "name": "Amazon.com: A Course of Pure Mathematics Centenary edition (Cambridge Mathematical Library) (9780521720557): G. H. Hardy, T. W. Körner: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Mathematics-Centenary-Cambridge-Mathematical-Library/dp/0521720559/ref=sr_1_1?s=books&ie=UTF8&qid=1296045973&sr=1-1"
            }, {
               "date_added": "12941218364000000",
               "guid": "807c174e-41f4-48ba-ad64-c4078f663d14",
               "id": "340",
               "name": "Amazon.com: Penrose Tiles to Trapdoor Ciphers: And the Return of Dr Matrix (Spectrum) (9780883855218): Martin Gardner: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Penrose-Tiles-Trapdoor-Ciphers-Spectrum/dp/0883855216/ref=sr_1_1?ie=UTF8&s=books&qid=1296744631&sr=1-1"
            }, {
               "date_added": "12941279647000000",
               "guid": "1ae9eea6-de23-4164-9932-f429af55d0d8",
               "id": "341",
               "name": "Amazon.com: My Best Mathematical and Logic Puzzles (Math & Logic Puzzles) (9780486281520): Martin Gardner: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Best-Mathematical-Logic-Puzzles-Math/dp/0486281523/ref=ntt_at_ep_dpt_1"
            }, {
               "date_added": "12941545971000000",
               "guid": "cb41588b-0431-475c-bef9-774b408781d3",
               "id": "342",
               "name": "Amazon.com: Div, Grad, Curl, and All That: An Informal Text on Vector Calculus, Fourth Edition (9780393925166): H. M. Schey: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Div-Grad-Curl-All-That/dp/0393925161/ref=sr_1_1?s=books&ie=UTF8&qid=1297072072&sr=1-1"
            }, {
               "date_added": "12941546715000000",
               "guid": "c53b66d9-0496-46ad-81d2-9c765428e26d",
               "id": "343",
               "name": "Amazon.com: The Shape of Space (Pure and Applied Mathematics) (9780824707095): Jeffrey R. Weeks: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Shape-Space-Pure-Applied-Mathematics/dp/0824707095/ref=sr_1_1?s=books&ie=UTF8&qid=1297072321&sr=1-1"
            }, {
               "date_added": "12942374290000000",
               "guid": "8f17b9f2-3fc0-4477-9c5b-1f0e830f6a62",
               "id": "344",
               "name": "Amazon.com: The Symmetries of Things (9781568812205): John Horton Conway, Heidi Burgiel, Chaim Goodman-Strauss: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Symmetries-Things-John-Horton-Conway/dp/1568812205/ref=sr_1_1?s=books&ie=UTF8&qid=1297900633&sr=1-1"
            }, {
               "date_added": "12942459702000000",
               "guid": "83454cb1-15f1-48fa-b7bd-62a9f66ffa0c",
               "id": "345",
               "name": "Amazon.com: 102 Combinatorial Problems (9780817643171): Titu Andreescu, Zuming Feng: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/102-Combinatorial-Problems-Titu-Andreescu/dp/0817643176/ref=sr_1_1?ie=UTF8&s=books&qid=1297985729&sr=8-1"
            }, {
               "date_added": "12942460988000000",
               "guid": "aa55c933-abb3-4f5f-9edf-52095a1a7ecb",
               "id": "346",
               "name": "Amazon.com: Indra's Pearls: The Vision of Felix Klein (9780521352536): David Mumford, Caroline Series, David Wright: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Indras-Pearls-Vision-Felix-Klein/dp/0521352533/ref=pd_sim_b_5"
            }, {
               "date_added": "12942656429000000",
               "guid": "bb593e91-9e34-41ee-81f2-77018949804d",
               "id": "347",
               "meta_info": {
                  "last_visited_desktop": "13182908621953274"
               },
               "name": "Amazon.com: Three-Dimensional Geometry and Topology (9780691083049): William P. Thurston, Silvio Levy: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Three-Dimensional-Geometry-Topology-William-Thurston/dp/0691083045/ref=pd_rhf_p_t_2"
            }, {
               "date_added": "12942745159000000",
               "guid": "df21c801-2e8e-4515-bfb3-838c51972098",
               "id": "348",
               "name": "Shape of Space (resources)",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.geometrygames.org/SoS/"
            }, {
               "date_added": "12942749570000000",
               "guid": "2a9c43c0-68df-42bf-b14e-0961357b7651",
               "id": "349",
               "name": "Amazon.com: Symmetry: Hermann Weyl: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Symmetry-Hermann-Weyl/dp/0691023743/ref=sr_1_1?s=books&ie=UTF8&qid=1298275403&sr=1-1"
            }, {
               "date_added": "12942749769000000",
               "guid": "92ff01a2-c5fd-4663-8073-4b85709495f6",
               "id": "350",
               "name": "Mathematics Pronunciation Guide",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.waukesha.uwc.edu/Faculty---Staff/Directory/Faculty-Staff-I-L/Kent-Kromarek/Mathematics-Pronunciation-Guide.aspx"
            }, {
               "date_added": "12942749788000000",
               "guid": "6af57b59-0bf8-4cdb-8a2e-4cefc953fc76",
               "id": "351",
               "name": "Greek Alphabet",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.waukesha.uwc.edu/Faculty---Staff/Directory/Faculty-Staff-I-L/Kent-Kromarek/Greek-Alphabet.aspx"
            }, {
               "date_added": "12942853029000000",
               "guid": "ebdb908f-6cb4-47eb-8e36-ebe6e959bd4b",
               "id": "352",
               "name": "Amazon.com: Geometry, Relativity and the Fourth Dimension (9780486234007): Rudolf v.B. Rucker: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Geometry-Relativity-Fourth-Dimension-Rudolf/dp/0486234002/ref=pd_sim_b_3"
            }, {
               "date_added": "12943010872000000",
               "guid": "13e67165-7ea1-4ff0-8984-54f88bd2196b",
               "id": "353",
               "name": "Amazon.com: Geometry and the Imagination (CHEL/87.H) (AMS Chelsea Publishing) (9780821819982): David Hilbert, S. Cohn-Vossen: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Geometry-Imagination-CHEL-Chelsea-Publishing/dp/0821819984/ref=sr_1_1?s=books&ie=UTF8&qid=1298535769&sr=1-1"
            }, {
               "date_added": "12943447909000000",
               "guid": "cf29b087-9b6b-4cfc-9b86-20471b52c7a2",
               "id": "354",
               "name": "Amazon.com: Naive Lie Theory (Undergraduate Texts in Mathematics) (9781441926814): John Stillwell: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Naive-Theory-Undergraduate-Texts-Mathematics/dp/144192681X/ref=ntt_at_ep_dpt_1"
            }, {
               "date_added": "12943449121000000",
               "guid": "563e3f56-7801-4841-91ca-5ff4658ea031",
               "id": "355",
               "name": "Amazon.com: Yearning for the Impossible: The Surprising Truths of Mathematics (9781568812540): John Stillwell: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Yearning-Impossible-Surprising-Truths-Mathematics/dp/156881254X/ref=ntt_at_ep_dpt_5"
            }, {
               "date_added": "12954540205390625",
               "guid": "3d739811-222c-4891-983d-de2aaf731c99",
               "id": "356",
               "name": "Mathematics Graduate Departments Ranking",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://math.scu.edu/~eschaefe/grad.html"
            }, {
               "date_added": "12958560590963250",
               "guid": "468edcaa-fb13-41a4-a3d1-6ad685d05453",
               "id": "357",
               "name": "Amazon.com: Mathematical Methods in Artificial Intelligence (Practitioners) (9780818672002): Edward A. Bender: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Mathematical-Methods-Artificial-Intelligence-Practitioners/dp/0818672005/ref=sr_1_4?s=books&ie=UTF8&qid=1314086244&sr=1-4"
            }, {
               "date_added": "12958689402821625",
               "guid": "74647e7c-acb6-4137-b031-d249938ed0fb",
               "id": "358",
               "name": "Ask NRICH (math forum)",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://nrich.maths.org/cgi-bin/discus/discus.cgi?pg=topics"
            }, {
               "date_added": "13061905571957931",
               "guid": "926cf369-283b-43ae-908e-3d1a65d4b752",
               "id": "596",
               "name": "Topology (2nd Edition): James Munkres: 9780131816299: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Topology-2nd-Edition-James-Munkres/dp/0131816292/ref=cm_cr_pr_product_top"
            }, {
               "date_added": "13061905606014971",
               "guid": "a9ed180a-2816-40eb-a01b-bda9b5e65198",
               "id": "597",
               "name": "Complex Analysis",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://people.math.gatech.edu/~cain/winter99/complex.html"
            }, {
               "date_added": "13061918201162021",
               "guid": "eb31908b-cfa9-4576-b01d-7f6bbd240fb0",
               "id": "598",
               "name": "Institutions",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://cseweb.ucsd.edu/~goguen/projs/inst.html"
            }, {
               "date_added": "13062006235201438",
               "guid": "0a39a727-7a98-4fec-be03-8a5256f25ad8",
               "id": "601",
               "name": "Brainfilling Curves: A Fractal Bestiary: Jeffrey Ventrella: 9780983054627: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Brainfilling-Curves-A-Fractal-Bestiary/dp/0983054622"
            }, {
               "date_added": "13062006685397420",
               "guid": "c0487c9f-6d3c-48e1-b0f4-f7c93857ac5b",
               "id": "602",
               "name": "Brainfilling Curves - A Fractal Bestiary",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.brainfillingcurves.com/"
            }, {
               "date_added": "13062186694999237",
               "guid": "394eca75-5c2f-499e-b75a-2f4f22349854",
               "id": "608",
               "name": "Real Mathematical Analysis (Undergraduate Texts in Mathematics): Charles C. Pugh: 9780387952970: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Mathematical-Analysis-Undergraduate-Texts-Mathematics/dp/0387952977/ref=sr_1_1?ie=UTF8&qid=1417710498&sr=8-1&keywords=real+mathematical+analysis"
            }, {
               "date_added": "13062535771968687",
               "guid": "b1b4fd97-2bab-4bd6-ad5b-d90d8f523d7d",
               "id": "620",
               "name": "Neural networks and deep learning",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://neuralnetworksanddeeplearning.com/chap4.html"
            }, {
               "date_added": "13083113831899918",
               "guid": "654e7a97-d145-43e4-849c-d1fe3f1382c9",
               "id": "785",
               "name": "Graphical Linear Algebra",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://graphicallinearalgebra.net/"
            }, {
               "date_added": "13134507019751292",
               "guid": "d7cd92e4-6634-425a-8327-4e8a646a2533",
               "id": "926",
               "meta_info": {
                  "last_visited_desktop": "13134507019764869"
               },
               "name": "Table of Contents (Immersive Linear Algebra)",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://immersivemath.com/ila/tableofcontents.html?"
            }, {
               "date_added": "13175737534772086",
               "guid": "354ceefc-4474-4062-8473-66724ed66a1e",
               "id": "1118",
               "meta_info": {
                  "last_visited_desktop": "13175737534802070"
               },
               "name": "Expository papers by K. Conrad",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.math.uconn.edu/~kconrad/blurbs/"
            }, {
               "date_added": "13213310514957001",
               "guid": "2f389909-f246-4fe8-87d1-acb9318f77ab",
               "id": "1464",
               "name": "BiVector.net",
               "sync_transaction_version": "44",
               "type": "url",
               "url": "https://bivector.net/tools.html"
            } ],
            "date_added": "12953862981756000",
            "date_modified": "13213333783879387",
            "guid": "084f2f77-72bd-43a4-b50e-089373c296a9",
            "id": "220",
            "name": "Mathematics",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13132278355992145",
               "guid": "70fa7ec7-d7e7-4c9d-9b5c-6e2f5f663e3a",
               "id": "914",
               "meta_info": {
                  "last_visited_desktop": "13132278355999207"
               },
               "name": "Resource Oriented Design  |  Cloud APIs  |  Google Cloud Platform",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://cloud.google.com/apis/design/resources"
            }, {
               "date_added": "13132278383359562",
               "guid": "b8b53076-1a46-4ec3-900b-7cdcead9c0c8",
               "id": "915",
               "meta_info": {
                  "last_visited_desktop": "13132278383365777"
               },
               "name": "Build APIs You Won't Hate: Everyone and their dog wants an API, so you should probably learn how to build them: Phil Sturgeon, Laura Bohill: 9780692232699: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/Build-APIs-You-Wont-Hate/dp/0692232699/ref=sr_1_1?ie=UTF8&qid=1487789904&sr=8-1&keywords=apis+you+won%27t+hate"
            }, {
               "date_added": "13132282110331368",
               "guid": "0405d87b-1c28-43a4-9d95-5c599a1c6903",
               "id": "916",
               "meta_info": {
                  "last_visited_desktop": "13132282110342714"
               },
               "name": "Learn Enough Command Line to Be Dangerous | LearnEnough.com",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.learnenough.com/command-line-tutorial"
            }, {
               "date_added": "13132282572539662",
               "guid": "dcd67a07-f16a-45df-bf00-aa2288a53434",
               "id": "917",
               "meta_info": {
                  "last_visited_desktop": "13132282572542927"
               },
               "name": "Eloquent Ruby (Addison-Wesley Professional Ruby): 8601300202396: Computer Science Books @ Amazon.com",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.amazon.com/dp/0321584104/ref=pd_luc_rh_bxgy_03_04_t_img_lh?_encoding=UTF8&psc=1"
            }, {
               "date_added": "13132528381307265",
               "guid": "30c0e97d-e415-42be-951f-8d8b63b8cc89",
               "id": "918",
               "meta_info": {
                  "last_visited_desktop": "13132528381313706"
               },
               "name": "Intro to DevOps | Udacity",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.udacity.com/course/intro-to-devops--ud611"
            }, {
               "date_added": "13132528549272371",
               "guid": "a8666551-13ac-42d8-bbf8-d24687b0eea9",
               "id": "919",
               "meta_info": {
                  "last_visited_desktop": "13132528549275480"
               },
               "name": "AWS_DevOps.pdf",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://d0.awsstatic.com/whitepapers/AWS_DevOps.pdf"
            }, {
               "date_added": "13132534562824634",
               "guid": "52e5320a-bdc3-4b6f-a2c4-e8fd28a38fcb",
               "id": "920",
               "meta_info": {
                  "last_visited_desktop": "13132534562838845"
               },
               "name": "Node.js Security Checklist | @RisingStack",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://blog.risingstack.com/node-js-security-checklist/"
            }, {
               "date_added": "13134854565549824",
               "guid": "a38abd23-8d87-4b1d-94c6-eba3f5a7207e",
               "id": "927",
               "meta_info": {
                  "last_visited_desktop": "13143146719904905"
               },
               "name": "Serverless - The Serverless Application Framework powered by AWS Lambda and API Gateway",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://serverless.com/"
            } ],
            "date_added": "13132278328697992",
            "date_modified": "13135196883934150",
            "guid": "91fdc5d6-057e-41bf-8cce-e2ff6bca9120",
            "id": "913",
            "name": "learning back-end",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "date_added": "13012677965003301",
            "guid": "015f394e-3b17-4851-b150-308826a7316f",
            "id": "89",
            "name": "Primers | Math ∩ Programming",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://jeremykun.com/primers/"
         }, {
            "date_added": "13005547216817264",
            "guid": "f52069bb-4606-4c9f-b258-14ec5b99e209",
            "id": "90",
            "meta_info": {
               "last_visited_desktop": "13151203422238865"
            },
            "name": "List of terms relating to algorithms and data structures - Wikipedia, the free encyclopedia",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://en.wikipedia.org/wiki/List_of_terms_relating_to_algorithms_and_data_structures"
         }, {
            "date_added": "12978561289192873",
            "guid": "a4a40751-1749-4726-9a7a-42b9d356a87c",
            "id": "99",
            "name": "Moleman 2 - Demoscene - The Art of the Algorithms (2012) - YouTube",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.youtube.com/watch?v=iRkZcTg1JWU"
         }, {
            "date_added": "13057014348773847",
            "guid": "45032d6f-dcff-474d-bac3-595918f961d8",
            "id": "104",
            "name": "VIM Adventures",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://vim-adventures.com/"
         }, {
            "date_added": "13057014348774342",
            "guid": "0f61a442-3e6d-4d2c-a931-d0181e9390de",
            "id": "109",
            "name": "P vs NP: A quick introduction | Alec Benzer",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://alecbenzer.com/blog/p-vs-np/"
         }, {
            "date_added": "12984133004307453",
            "guid": "6d9c180f-3d63-422c-a54b-24e8c87de168",
            "id": "114",
            "name": "DragonBox - The Math game",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://dragonboxapp.com/"
         }, {
            "date_added": "12985750331353326",
            "guid": "5f2f489e-a4ac-493a-9a8e-3593ace1aa52",
            "id": "119",
            "name": "So, you you want to write software?: Life Without Objects",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://skipoleschris.blogspot.co.uk/2012/04/life-without-objects.html"
         }, {
            "date_added": "12986354123515442",
            "guid": "8984c199-b489-40e5-a753-0beb9fd42965",
            "id": "126",
            "name": "Sorting Algorithm Reference (+animations)",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.sorting-algorithms.com/"
         }, {
            "date_added": "12986444972940859",
            "guid": "adeea2e8-617d-4261-a379-f51916693b84",
            "id": "127",
            "name": "Why the Higgs Particle Matters | Of Particular Significance",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://profmattstrassler.com/articles-and-posts/the-higgs-particle/why-the-higgs-particle-matters/"
         }, {
            "children": [ {
               "date_added": "13163990463555397",
               "guid": "8bfdb078-9d5b-47c5-933a-97226a343a70",
               "id": "1064",
               "meta_info": {
                  "last_visited_desktop": "13163990463569757"
               },
               "name": "Lambda Diagrams",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://tromp.github.io/cl/diagrams.html"
            }, {
               "date_added": "13171164203601781",
               "guid": "031a5ecc-cea1-4ade-9142-2f787675e0b6",
               "id": "1092",
               "meta_info": {
                  "last_visited_desktop": "13199174072401445"
               },
               "name": "The memory models that underlie programming languages",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://canonical.org/~kragen/memory-models/"
            } ],
            "date_added": "13163990531242680",
            "date_modified": "13171672754594888",
            "guid": "e0a80eb9-312a-4004-ae12-6c9bebbd9cde",
            "id": "1065",
            "name": "Computer Science",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "date_added": "12986601046456752",
            "guid": "656cc0a9-117e-4fec-8d5f-56424261cae8",
            "id": "129",
            "name": "Graph Visualisation and Navigation in Information Visualisation",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://servus.itn.liu.se/courses/TNM048/ref/graph.htm"
         }, {
            "date_added": "12986646017359878",
            "guid": "d1f55d6b-c438-4ade-a693-c0ebe4f2cb5c",
            "id": "132",
            "meta_info": {
               "last_visited_desktop": "13195264778279160"
            },
            "name": "Stevey's Blog Rants: The Universal Design Pattern",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://steve-yegge.blogspot.com/2008/10/universal-design-pattern.html"
         }, {
            "date_added": "12986649348097386",
            "guid": "84f8de6b-4866-4f3d-829d-54956042d60e",
            "id": "133",
            "name": "Declarative Specification of Template-Based Textual Editors",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://eelcovisser.org/post/211/declarative-specification-of-template-based-textual-editors"
         }, {
            "date_added": "13057014348776631",
            "guid": "a8655d08-04a1-4ce0-934d-d3676803b14a",
            "id": "134",
            "name": "Ensō Blog > Don't design your programs… Program your designs!",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://enso-lang.org/blog/"
         }, {
            "children": [ {
               "date_added": "12993461834752106",
               "guid": "53aa84be-f08f-4a59-88cf-8a4404912656",
               "id": "372",
               "name": "Faceset 2-bit | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/faceset-2-bit"
            }, {
               "date_added": "12993467986138047",
               "guid": "5dd4557b-f504-488a-b9c8-5aadecf963da",
               "id": "373",
               "name": "Flare Portrait Pack (Number One) | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/flare-portrait-pack-number-one"
            }, {
               "date_added": "12993462029421371",
               "guid": "b2d161f0-0c95-49fd-a447-3f5e98668a02",
               "id": "374",
               "name": "Flare windows | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/flare-windows"
            }, {
               "date_added": "12993462629255679",
               "guid": "f4eaa07e-0ca4-4115-8d21-28a64562434e",
               "id": "375",
               "name": "RPG items zoomed | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/rpg-items-zoomed"
            }, {
               "date_added": "12993462636084070",
               "guid": "8e1e8d37-0442-4243-bd2d-dedf9c1e569f",
               "id": "376",
               "name": "Metal tileset | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/metal-tileset"
            }, {
               "date_added": "12993463064021547",
               "guid": "9d1d5308-abe6-4ebd-b062-420e61e61085",
               "id": "377",
               "name": "RPG GUI construction kit v1.0 | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/rpg-gui-construction-kit-v10"
            }, {
               "date_added": "12993464062727669",
               "guid": "35738296-87ef-4fc0-8dbb-d0dc029c2dfe",
               "id": "378",
               "name": "The Snow Shoveler guy - Trucker Hat Portrait | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/the-snow-shoveler-guy-trucker-hat-portrait"
            }, {
               "date_added": "12993464143020262",
               "guid": "195e8964-6269-4bf2-bc41-9d78ed70e101",
               "id": "379",
               "name": "2 Portraits for a cold world | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/2-portraits-for-a-cold-world"
            }, {
               "date_added": "12993464297637105",
               "guid": "b2c883e5-4ce3-4ab3-aa28-3760721b82d3",
               "id": "380",
               "name": "Post Apocalyptic Woman 2 | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/post-apocalyptic-woman-2"
            }, {
               "date_added": "12993464303714453",
               "guid": "3c445241-34c8-4ae5-bf65-27f898016796",
               "id": "381",
               "name": "Four Post-Apocalyptic Portraits | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/four-post-apocalyptic-portraits"
            }, {
               "date_added": "12993464309322774",
               "guid": "71fc3da0-704e-42f6-b65a-f4cb7f472fe3",
               "id": "382",
               "name": "6 Post-Apocalyptical Snow Portraits | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/6-post-apocalyptical-snow-portraits"
            }, {
               "date_added": "12993464396608766",
               "guid": "0fe6e3cc-aeee-41c3-82d7-c9ce5715ffc9",
               "id": "383",
               "name": "The Hooded One | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/hooded-one"
            }, {
               "date_added": "12993464509310212",
               "guid": "a97834ac-83aa-489a-bde4-fe446a23bcf8",
               "id": "384",
               "name": "Ma Niity | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/ma-niity"
            }, {
               "date_added": "12993547458069433",
               "guid": "5128c1fb-4502-4b20-bd16-4a5140e7b472",
               "id": "385",
               "name": "My Shadowrun Gun Collection 1 by ~biometal79 on deviantART",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://biometal79.deviantart.com/art/My-Shadowrun-Gun-Collection-1-48801985"
            }, {
               "date_added": "12993465562227436",
               "guid": "2efbddd4-45d3-4e1d-9f33-8ec5f1c160f5",
               "id": "386",
               "name": "FLARE Portrait Pack (Number Five) | OpenGameArt.org",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://opengameart.org/content/flare-portrait-pack-number-five"
            } ],
            "date_added": "13057014348779260",
            "date_modified": "13125517336683329",
            "guid": "ccf428eb-4181-49e1-b075-4a4ef77a9aa9",
            "id": "162",
            "name": "cyber stuff",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "date_added": "12993587738373002",
            "guid": "fa8a4fc6-fc72-40d2-8acd-098d145dbbb7",
            "id": "164",
            "name": "Open Font Library",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://openfontlibrary.org/en/catalogue?view=sentence"
         }, {
            "date_added": "13057014348779702",
            "guid": "256d8c1d-07d5-4fb4-8d7c-c1b937981361",
            "id": "168",
            "name": "The Bactra Review",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://masi.cscs.lsa.umich.edu/~crshalizi/reviews/"
         }, {
            "date_added": "12995100347098973",
            "guid": "2753e900-ed50-4c39-a7b4-4695859e32bf",
            "id": "169",
            "name": "The Spriters Resource",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.spriters-resource.com/pc_computer/Doom1n2/sheet/27882"
         }, {
            "date_added": "12995100448904796",
            "guid": "8286b554-bcbc-4df2-a52a-d45603f68537",
            "id": "170",
            "name": "Most Downloaded Free Fonts | Font Squirrel",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.fontsquirrel.com/fonts/list/mostdownloaded"
         }, {
            "date_added": "12997034698549741",
            "guid": "5224cfd1-4f9a-4e39-807d-411529873521",
            "id": "174",
            "name": "Discussions of miscellaneous mathematical topics.",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://www.dpmms.cam.ac.uk/~wtg10/mathsindex.html"
         }, {
            "date_added": "13057014348780328",
            "guid": "ea924bb0-1c15-4c8f-a56c-afa18b341105",
            "id": "175",
            "name": "MathPages",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.mathpages.com/home/"
         }, {
            "date_added": "12997743061236513",
            "guid": "938bd079-e664-4a46-85b6-6de503042998",
            "id": "178",
            "name": "Mindstorms: Children, Computers, And Powerful Ideas: Seymour A. Papert: 9780465046744: Amazon.com: Books",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.amazon.com/Mindstorms-Children-Computers-Powerful-Ideas/dp/0465046746/ref=sr_1_2?ie=UTF8&qid=1353269365&sr=8-2&keywords=mindstorms"
         }, {
            "date_added": "12999317519617529",
            "guid": "9ac1d05f-67f1-4b7e-819e-ac6e1e88ef4f",
            "id": "182",
            "name": "Math | BetterExplained",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://betterexplained.com/articles/category/math/"
         }, {
            "date_added": "12999652869982437",
            "guid": "85dd1ef9-d9ac-4c77-8494-004a0a846e2b",
            "id": "183",
            "name": "The Science of Willpower, Habits, and Behavior Change - Skillshare",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.skillshare.com/The-Science-of-Willpower-Habits-and-Behavior-Change/497888362/1910651525?refId=9728597"
         }, {
            "date_added": "13003277229378745",
            "guid": "1a923e0d-fa10-4c25-a937-fe0c90cf465b",
            "id": "186",
            "name": "MathFiction Homepage",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://kasmana.people.cofc.edu/MATHFICT/"
         }, {
            "date_added": "12895831517000000",
            "guid": "ac7f2b68-f50f-45b6-bd27-4f6572a7a8ed",
            "id": "192",
            "name": "Office Orgonomics Checklist",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.office-ergo.com/a.htm"
         }, {
            "date_added": "12902426251000000",
            "guid": "aa53f2a1-13e8-4249-9d71-006d7b68194e",
            "id": "201",
            "name": "What computer science can teach economics",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://web.mit.edu/newsoffice/2009/game-theory.html"
         }, {
            "date_added": "12902829191000000",
            "guid": "2ad3e2d7-2824-418e-9b72-4e0e17a8a5a0",
            "id": "205",
            "name": "Hypercomplex Fractals",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.bugman123.com/Hypercomplex/index.html"
         }, {
            "date_added": "12914859251000000",
            "guid": "632358aa-2e48-42fd-88c7-b71fa7ad0725",
            "id": "221",
            "name": "Symphony of Science",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://symphonyofscience.com/"
         }, {
            "date_added": "12918822962000000",
            "guid": "f365c17f-9b38-47af-b208-fcdf43f75431",
            "id": "226",
            "name": "Amazon.com: As Above, So Below: A Novel of Peter Bruegel (9780765304032): Rudy Rucker: Books",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.amazon.com/dp/0765304031/?tag=fourmilabwwwfour"
         }, {
            "date_added": "12918823662000000",
            "guid": "55dece45-2c26-4dfa-aacd-6e2d6ac04929",
            "id": "227",
            "name": "Amazon.com: Lectures On Computation (Frontiers in Physics) (9780201489910): Richard P. Feynman:…",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.amazon.com/dp/0201489910/?tag=fourmilabwwwfour"
         }, {
            "date_added": "12918825762000000",
            "guid": "7f66de2d-3c51-4ebf-8de7-45fbb1184a40",
            "id": "231",
            "name": "Amazon.com: The Open Society and Its Enemies, Vol. 1: The Spell of Plato (9780691019680): Sir Karl Raimund Popper: Books",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.amazon.com/dp/0691019681/?tag=fourmilabwwwfour"
         }, {
            "date_added": "12918832263000000",
            "guid": "82c2a353-e3b3-4ce1-bc61-c01520e0592d",
            "id": "236",
            "name": "Amazon.com: Explaining Postmodernism: Skepticism and Socialism from Rousseau to Foucault (9781592476428): Stephen R.C. Hicks: Books",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.amazon.com/gp/product/1592476422/ref=kinw_rke_tl_1"
         }, {
            "date_added": "12918827683000000",
            "guid": "01dc8c8d-90c7-4051-b41d-80de61c7a0d8",
            "id": "233",
            "name": "Computation, Memory, Nature, and Life",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.fourmilab.ch/documents/comp_mem_nat_life/"
         }, {
            "date_added": "12920710618000000",
            "guid": "7ac3921c-928f-4d42-bd40-faf2058deb2a",
            "id": "237",
            "name": "YouTube - Your Nightly Dreams",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.youtube.com/watch?v=e6qhwdTzilg"
         }, {
            "date_added": "12921573229000000",
            "guid": "ea4e83d1-0841-4d90-8845-548f82095542",
            "id": "238",
            "name": "On Denoting",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://cscs.umich.edu/~crshalizi/Russell/denoting/"
         }, {
            "date_added": "12921573234000000",
            "guid": "795d9c6c-0f86-4ada-8eeb-d8166422c7fa",
            "id": "239",
            "name": "Descriptions (Stanford Encyclopedia of Philosophy/Fall 2008 Edition)",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://plato.stanford.edu/archives/fall2008/entries/descriptions/"
         }, {
            "date_added": "12922940603000000",
            "guid": "154beb96-7e33-4d19-b4cd-b734efb291e1",
            "id": "240",
            "name": "Amazon.com: Developing Quality Technical Information: A Handbook for Writers and Editors eBook: Gretchen Hargis, Michelle Carey, Ann Kilty Hernandez, Polly Hughes, Deirdre Longo, Shannon Rouiller, Elizabeth Wilde: Kindle Store",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.amazon.com/Developing-Quality-Technical-Information-ebook/dp/B0026OR0IS/ref=sr_1_4?ie=UTF8&m=AG56TWVU5XWC2&s=digital-text&qid=1278462784&sr=8-4"
         }, {
            "children": [ {
               "date_added": "12921751702000000",
               "guid": "2d91f3af-647d-4332-95d1-759cfc1cd7be",
               "id": "309",
               "name": "PsiPog.net : Mnemonic Induction of Lucid Dreams (MILD) by Stephen LaBerge",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.psipog.net/art-mnemonic-induction-lucid-dreams.html"
            }, {
               "date_added": "12921756135000000",
               "guid": "127dc4cf-8772-4d1b-8c36-709ec398c07b",
               "id": "310",
               "meta_info": {
                  "last_visited_desktop": "13149365407539197"
               },
               "name": "An Overview of all Lucid Induction Methods",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.dreamviews.com/community/showthread.php?t=51214"
            }, {
               "date_added": "12922359657000000",
               "guid": "dca9ecf6-d1da-4156-9785-41ff6cfef547",
               "id": "311",
               "name": "Self-Reference (Stanford Encyclopedia of Philosophy)",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://plato.stanford.edu/entries/self-reference/"
            }, {
               "date_added": "12922365881000000",
               "guid": "7ffebd55-ab0e-4433-8316-4ff2ef6abcc0",
               "id": "312",
               "name": "Conversation with John Searle, page 4 of 6",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://globetrotter.berkeley.edu/people/Searle/searle-con4.html"
            } ],
            "date_added": "12953862981785000",
            "date_modified": "13176778144017816",
            "guid": "11717abb-0672-4ccd-9b07-1433b22334c6",
            "id": "241",
            "name": "lucid dreaming",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "date_added": "12923198392000000",
            "guid": "f0c43187-b48a-4a18-acd2-904ff34a21d9",
            "id": "242",
            "name": "YouTube - Ergohuman Chair Review - Raynor Ergohuman Review with Ergonomics Focus",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.youtube.com/watch?v=Iu8vgHp3Cgs"
         }, {
            "date_added": "12923237327000000",
            "guid": "5e07efa8-bec5-4b2c-9770-9cd66a883e42",
            "id": "243",
            "name": "Profundus Medical Massage",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.profundusmedicalmassage.com/Home_Page.html"
         }, {
            "date_added": "12923835995000000",
            "guid": "d362fdaf-23c5-42c2-b971-17f2f41f6c9b",
            "id": "245",
            "name": "Amazon.com: Ask the Dust (P.S.) (9780060822552): John Fante: Books",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.amazon.com/Ask-Dust-P-S-John-Fante/dp/0060822554/ref=sr_1_1?ie=UTF8&s=books&qid=1279358286&sr=8-1"
         }, {
            "date_added": "12924922931000000",
            "guid": "d888c4fa-4430-40c1-a8a3-e90e7f450e77",
            "id": "246",
            "name": "the Complete works of H. P. Lovecraft",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.dagonbytes.com/thelibrary/lovecraft/index.html"
         }, {
            "date_added": "13003380828836000",
            "guid": "bf493c42-2087-4de8-9ef2-0a6e177a3349",
            "id": "247",
            "name": "Online Tutoring, Homework Help and Test Prep in Math, Science, English and Social Studies - Tutor.com for Families",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.tutor.com/"
         }, {
            "date_added": "12926226765000000",
            "guid": "599ee6d4-ac0f-425a-aacd-4e8301544a8a",
            "id": "248",
            "name": "wonder-slug on deviantART",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://wonder-slug.deviantart.com/"
         }, {
            "children": [ {
               "date_added": "12927583176000000",
               "guid": "b56130eb-6529-4640-8f50-a976fdcacfb5",
               "id": "307",
               "name": "Bicycling Life Home Page",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.bicyclinglife.com/"
            }, {
               "date_added": "12927592047000000",
               "guid": "ef2e83ed-fd09-41ba-9214-0d03847aa6e8",
               "id": "308",
               "name": "Safety Advice",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.bicyclinglife.com/SafetySkills/index.html"
            } ],
            "date_added": "12953862981790000",
            "date_modified": "13125478384614852",
            "guid": "b3caa148-36ac-4d50-ac19-f7df7d9791ae",
            "id": "249",
            "name": "Cycling",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "12939282625000000",
               "guid": "fececced-9c7a-4d3c-a4b5-3e279d22f82d",
               "id": "298",
               "name": "All Electronics | Electronic and Electro-Mechanical Parts and Supplies at Discount Prices",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.allelectronics.com/"
            }, {
               "date_added": "12939289495000000",
               "guid": "9cd106a7-ecbd-4b28-b3fe-d5dfb71f8dde",
               "id": "299",
               "name": "Basic Electricity Tutorial - Switches",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.1728.com/project2.htm"
            }, {
               "date_added": "12950876144000000",
               "guid": "ef781932-b1a9-46ba-811a-9122a48baaa8",
               "id": "300",
               "name": "How to Build a Robot Tutorial - Society of Robots",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.societyofrobots.com/microcontroller_tutorial.shtml"
            }, {
               "date_added": "12950878212000000",
               "guid": "e18ef028-5025-4301-a47e-0db5dbdb76b2",
               "id": "301",
               "name": "News - SparkFun Electronics",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.sparkfun.com/"
            }, {
               "date_added": "12954188426329125",
               "guid": "fda717fb-23fa-4b6a-9b29-e4740b751531",
               "id": "302",
               "name": "Arduino - Tutorials",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://arduino.cc/en/Tutorial/HomePage"
            }, {
               "date_added": "12954188457484375",
               "guid": "151c8afb-6520-46ae-95e6-307e9dade93b",
               "id": "303",
               "name": "Circuits (part 1) | Khan Academy",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.khanacademy.org/video/circuits--part-1?playlist=Physics"
            }, {
               "date_added": "12954188529015625",
               "guid": "cc1c3f78-4099-45ec-bd64-176244582992",
               "id": "304",
               "name": "Arduino Tutorials « t r o n i x s t u f f",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://tronixstuff.wordpress.com/tutorials/"
            }, {
               "date_added": "12954554607172875",
               "guid": "c53b4627-f813-4dfa-9bd5-96fff0744fdf",
               "id": "305",
               "name": "Exported Electronics Bookmarks",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://yongbakos.com/hardware_hacking/"
            }, {
               "date_added": "12954554693813500",
               "guid": "8874daf7-84d1-480d-90e7-4a06cce7bbe3",
               "id": "306",
               "name": "Jameco Electronics - Electronic Components Distributor",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.jameco.com/webapp/wcs/stores/servlet/StoreCatalogDisplay?storeId=10001&catalogId=10001&langId=-1"
            }, {
               "date_added": "13060858914077865",
               "guid": "ae2c25f7-7c2f-4c5a-9146-b6b113670f05",
               "id": "552",
               "meta_info": {
                  "last_visited_desktop": "13158804489768980"
               },
               "name": "Concise electronics for geeks",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://lcamtuf.coredump.cx/electronics/"
            }, {
               "date_added": "13177033559923210",
               "guid": "b56d24f5-b57e-4540-999d-6225a4411f68",
               "id": "1128",
               "meta_info": {
                  "last_visited_desktop": "13177033559932442"
               },
               "name": "Circuit Simulator",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.falstad.com/circuit/circuitjs.html"
            }, {
               "date_added": "13179416480341388",
               "guid": "b0c39420-5b8c-4963-ba27-7027c9513f30",
               "id": "1161",
               "meta_info": {
                  "last_visited_desktop": "13179416480344997"
               },
               "name": "Pixelblaze — Ben Hencke",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.bhencke.com/pixelblaze/"
            } ],
            "date_added": "12953862981790000",
            "date_modified": "13179416492473542",
            "guid": "35d2cdfc-a578-4c18-b908-76d111628eef",
            "id": "250",
            "name": "Electronics",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "date_added": "12941203246000000",
            "guid": "c2c16ae2-a2da-4eef-bf18-e72a0fada409",
            "id": "251",
            "name": "Scale of Universe - Interactive Scale of the Universe Tool",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://primaxstudio.com/stuff/scale_of_universe/"
         }, {
            "children": [ {
               "date_added": "12942278612000000",
               "guid": "922f32ae-0e72-4bee-b24d-da6b83140bd9",
               "id": "294",
               "name": "GOD, THE DEVIL, AND GODEL",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www2.units.it/etica/2003_1/3_monographica.htm"
            }, {
               "date_added": "12942279277000000",
               "guid": "1457ccbc-c959-4f32-b9ca-c1ebed474509",
               "id": "295",
               "name": "people.cohums.ohio-state.edu/shapiro4/shapiroselfevidence.pdf",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://people.cohums.ohio-state.edu/shapiro4/shapiroselfevidence.pdf"
            }, {
               "date_added": "12942278083000000",
               "guid": "8cc42590-04e2-4c70-b92d-6741e59e1b5b",
               "id": "296",
               "name": "Rob Rupert's papers",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://spot.colorado.edu/~rupertr/Papers.htm"
            }, {
               "date_added": "12942060279000000",
               "guid": "171d94de-8080-4123-8083-57eb4c9e43e8",
               "id": "297",
               "name": "Robert Hanna's Home Page",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://spot.colorado.edu/~rhanna/"
            } ],
            "date_added": "12953862981793000",
            "date_modified": "13125531742467557",
            "guid": "e32084a9-33d5-4711-a5f8-355784350f37",
            "id": "252",
            "name": "Philosophy",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13004084216761438",
               "guid": "8dd2e003-8dcb-4317-a46a-052b2a227c66",
               "id": "269",
               "name": "How James Beat RSI | How I Beat RSI",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.howibeatrsi.com/how-james-beat-rsi/"
            }, {
               "date_added": "13004084700435672",
               "guid": "b9f60c94-118f-4c4e-bce5-7171e9383f31",
               "id": "270",
               "name": "Workbook vs Online Tutorial",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://saveyourself.ca/tutorials/trigger-points-workbook.php?gclid=CN7P9ozkkbUCFcsWMgodbCgA5w"
            }, {
               "date_added": "13007461084698295",
               "guid": "c2ef06b5-8fd3-44f4-98f7-a2d94427c101",
               "id": "271",
               "name": "Unlearn Your Pain: Howard Schubiner MD, Michael Betzold: 9780984336708: Amazon.com: Books",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.amazon.com/Unlearn-Your-Pain-Howard-Schubiner/dp/0984336702/ref=sr_1_2?ie=UTF8&qid=1362987468&sr=8-2&keywords=unlearn+your+pain"
            }, {
               "date_added": "13146532913057807",
               "guid": "df866063-619c-4ce1-a780-546049df9701",
               "id": "983",
               "meta_info": {
                  "last_visited_desktop": "13146532913059126"
               },
               "name": "Harvard RSI Action --> The Mind/Body Approach --> What is RSI?",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.rsi.deas.harvard.edu/mb_what_is.html"
            }, {
               "date_added": "13146532925345751",
               "guid": "cfd1e617-7fcf-4885-995b-00b1810faf31",
               "id": "984",
               "name": "melling/ErgonomicNotes: Ergonomic keyboards and mice, programming by voice, RSI, and standing desks.",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/melling/ErgonomicNotes/"
            } ],
            "date_added": "13004084247402909",
            "date_modified": "13146879007051521",
            "guid": "c8eb3257-40b0-4c40-bc49-5b6d4038aad9",
            "id": "254",
            "name": "rsi info",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "date_added": "13013059556007341",
            "guid": "d7166a29-9796-4fe5-a792-fc344c01fbb7",
            "id": "255",
            "meta_info": {
               "last_visited_desktop": "13177546771708497"
            },
            "name": "Turing Drawings",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://wry.me/hacking/Turing-Drawings/"
         }, {
            "date_added": "13034759409382222",
            "guid": "777ac43d-d32e-4714-be72-daa502717a4b",
            "id": "256",
            "name": "Nightcode",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://nightcode.info/"
         }, {
            "date_added": "13037923677565000",
            "guid": "905451e7-063a-4637-b4e7-d5354afadacd",
            "id": "257",
            "name": "Ithkuil - Wikipedia, the free encyclopedia",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://en.wikipedia.org/wiki/Ithkuil#Possible_advantages"
         }, {
            "date_added": "13037923963786324",
            "guid": "d973175a-8f1b-47bd-ac0a-fbf96c699d9f",
            "id": "258",
            "name": "A Grammar of the Ithkuil Language - Introduction",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.ithkuil.net/00_intro.html"
         }, {
            "date_added": "13038533315451297",
            "guid": "60d24d42-182b-4f18-9fe5-0a7bfe8ea545",
            "id": "259",
            "name": "Mathematicians are chronically lost and confused (and that’s how it’s supposed to be)",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://j2kun.svbtle.com/mathematicians-are-chronically-lost-and-confused"
         }, {
            "date_added": "13043493440938119",
            "guid": "5653acca-2225-4205-bebc-7286c2c89838",
            "id": "260",
            "name": "Steven Universe Episode 1 Gem Glow | Watch cartoons online, Watch anime online, English dub anime",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.watchcartoononline.com/steven-universe-episode-1-gem-glow"
         }, {
            "date_added": "13050487390395994",
            "guid": "ff46be8a-bf89-4871-a70a-40807f6e4af7",
            "id": "262",
            "name": "Holland Tab by Sufjan Stevens | Indie Guitar Tabs",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.indieguitartabs.com/bands/sufjan_stevens/07_holland.html"
         }, {
            "date_added": "13051321757282695",
            "guid": "8ec51b4a-a764-4f22-ade7-954edefe9351",
            "id": "263",
            "name": "Global Leaderboard - Memrise",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.memrise.com/top-secret-global-leaderboard/"
         }, {
            "date_added": "13060866397428895",
            "guid": "59a39648-7b58-4fd9-9989-5a5ebb00a7e0",
            "id": "565",
            "name": "Joseph Goguen-Publications",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://cseweb.ucsd.edu/~goguen/pubs/"
         }, {
            "date_added": "13061821730386040",
            "guid": "96b42413-6f0a-47ac-a1a3-e67d2362d2b4",
            "id": "587",
            "name": "papers-we-love/papers-we-love · GitHub",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://github.com/papers-we-love/papers-we-love"
         }, {
            "date_added": "13065540519221543",
            "guid": "3215941a-2090-45d7-a0a1-1110af75c7f7",
            "id": "640",
            "name": "exDM69's comments | Hacker News",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://news.ycombinator.com/threads?id=exDM69"
         }, {
            "date_added": "13065572596205316",
            "guid": "549c4ec2-80c9-4586-ae77-e46170363d25",
            "id": "642",
            "name": "Demoscene Research » Bibliography",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.kameli.net/demoresearch2/?page_id=4"
         }, {
            "date_added": "13066282308599286",
            "guid": "b1b73fce-f49c-443b-b41a-1d7557a932de",
            "id": "653",
            "name": "Watch Seinfeld, The Understudy, Season 6, Episode 21 Online Free - Crackle",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.crackle.com/c/seinfeld/the-understudy/2483666"
         }, {
            "date_added": "13066905714476764",
            "guid": "e3b640f0-4c4d-4c03-996c-b71a9759024a",
            "id": "668",
            "name": "The Art of Electronics: Paul Horowitz, Winfield Hill: 9780521370950: Amazon.com: Books",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.amazon.com/Art-Electronics-Paul-Horowitz/dp/0521370957/ref=sr_1_1?ie=UTF8&qid=1422432084&sr=8-1&keywords=the+art+of+electronics&pebp=1422432110778&peasin=521370957"
         }, {
            "date_added": "13071265647309000",
            "guid": "2f10d296-a60a-4459-9a27-feb33816f26c",
            "id": "715",
            "name": "Wireworld Player (Flash)",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.rezmason.net/wireworld/"
         }, {
            "date_added": "13072474698667000",
            "guid": "f435fb6b-f96f-4924-951f-de1259da2ab7",
            "id": "723",
            "name": "Strang Lectures Linear Algebra",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://web.mit.edu/18.06/www/videos.shtml"
         }, {
            "date_added": "13074306300128000",
            "guid": "568f495f-720b-4cec-8d02-07d6a024c15b",
            "id": "748",
            "name": "Hack",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://hacklang.org/"
         }, {
            "date_added": "13074484549682000",
            "guid": "6dcb3e01-6ff9-4175-b81a-56a36d7d0658",
            "id": "756",
            "name": "Revised Report on the Propagator Model",
            "sync_transaction_version": "41",
            "type": "url",
            "url": "http://groups.csail.mit.edu/mac/users/gjs/propagators/"
         }, {
            "date_added": "13075599441952000",
            "guid": "a9d3fad1-07c4-4b2c-a57a-71fbd240274b",
            "id": "763",
            "name": "Scroll Back: The Theory and Practice of Cameras in Side-Scrollers",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://docs.google.com/document/d/1iNSQIyNpVGHeak6isbP6AHdHD50gs8MNXF1GCf08efg/pub#h.7k1hlzi60mvf"
         }, {
            "date_added": "13076570646001000",
            "guid": "c831af35-8e67-4309-8eeb-678130d20a0c",
            "id": "772",
            "name": "Gallery of Concept Visualization",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://conceptviz.github.io/#/e30="
         }, {
            "children": [ {
               "date_added": "13077262540537000",
               "guid": "2d62be59-cd3b-46a3-9d94-b13065692cdb",
               "id": "775",
               "name": "Gaffer on Games | Networked Physics (2004)",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://gafferongames.com/game-physics/networked-physics/"
            }, {
               "date_added": "13086642291232499",
               "guid": "d4b61784-83c3-41fa-a8eb-bcb456ba786a",
               "id": "798",
               "name": "Gaffer on Games | Reliability, Ordering and Congestion Avoidance over UDP",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://gafferongames.com/networking-for-game-programmers/reliability-and-flow-control/"
            } ],
            "date_added": "13077262575843008",
            "date_modified": "13125517336683323",
            "guid": "9c7e4599-15c8-4a2b-a09e-6cd24eaf634f",
            "id": "776",
            "name": "Networking",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13083831802582196",
               "guid": "2b969e1a-fcf1-4894-b504-f2d57475001b",
               "id": "790",
               "name": "How a Kalman filter works, in pictures | Bzarg",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.bzarg.com/p/how-a-kalman-filter-works-in-pictures/"
            } ],
            "date_added": "13083831785754220",
            "date_modified": "13083880908595608",
            "guid": "f03dae43-a362-4c44-a6d1-435100f2719b",
            "id": "789",
            "name": "Glove project",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13124227832188525",
               "guid": "f66f320d-68a5-40c5-82f2-328c83290758",
               "id": "856",
               "name": "The Black Arts of SaaS Pricing",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://training.kalzumeus.com/newsletters/archive/saas_pricing"
            }, {
               "date_added": "13124227840563787",
               "guid": "91b2cb36-44bf-4757-ba3d-d5f27646ce93",
               "id": "857",
               "name": "What I Learned From Increasing My Prices | ExtendsLogic",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.extendslogic.com/business/what-i-learned-from-increasing-my-prices/"
            }, {
               "date_added": "13057014348807226",
               "guid": "ae94baeb-6a72-4163-b575-eef82e29d20b",
               "id": "433",
               "name": "Kalzumeus Software",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.kalzumeus.com/"
            }, {
               "date_added": "13125474165237887",
               "guid": "3580fe5d-c532-46b6-9765-393e068cab82",
               "id": "871",
               "name": "Howard Schultz and Starbucks Coffee Company - Case - Harvard Business School",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.hbs.edu/faculty/Pages/item.aspx?num=27853"
            }, {
               "date_added": "13126243806934229",
               "guid": "c6b74c2a-a5f8-442d-893c-0bd53a2a9da2",
               "id": "877",
               "name": "Stripe: Atlas Guide",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://stripe.com/atlas/guide"
            }, {
               "date_added": "13141609477966982",
               "guid": "2bd6b2c1-5834-42c5-8684-f3d966da400f",
               "id": "952",
               "meta_info": {
                  "last_visited_desktop": "13141609477975432"
               },
               "name": "Selling Software To Large Businesses",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://training.kalzumeus.com/newsletters/archive/enterprise_sales"
            }, {
               "date_added": "13144360471549759",
               "guid": "b6fafb80-36e0-4a45-bd38-7a83b8996c75",
               "id": "962",
               "meta_info": {
                  "last_visited_desktop": "13144360471552173"
               },
               "name": "How To Get Press for Your Startup: The Complete Guide",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://medium.com/startup-grind/how-to-get-press-for-your-startup-the-complete-guide-b79c57318113"
            }, {
               "children": [ {
                  "date_added": "13145397088626414",
                  "guid": "48c52dda-b5fd-4e4e-b76c-fac019ab55d2",
                  "id": "975",
                  "meta_info": {
                     "last_visited_desktop": "13145397088628435"
                  },
                  "name": "Customer Messaging Platform | Intercom",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://www.intercom.com/"
               }, {
                  "date_added": "13145397094144226",
                  "guid": "a7f92413-cf1a-443b-bf34-a89a7c8d081e",
                  "id": "976",
                  "meta_info": {
                     "last_visited_desktop": "13145397094146512"
                  },
                  "name": "Mention: Media Monitoring Made Simple",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://mention.com/en/"
               } ],
               "date_added": "13145397080538988",
               "date_modified": "13145401623805777",
               "guid": "5328bc42-49d4-4dee-ac10-22b77522d809",
               "id": "974",
               "name": "software",
               "sync_transaction_version": "1",
               "type": "folder"
            }, {
               "date_added": "13150240780058889",
               "guid": "f38a40a2-d28f-4824-9eb4-06a406eeb4bd",
               "id": "993",
               "meta_info": {
                  "last_visited_desktop": "13150240780071000"
               },
               "name": "Stripe Atlas: The best way to start an internet business",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://stripe.com/atlas"
            } ],
            "date_added": "13124227826266440",
            "date_modified": "13150758101398201",
            "guid": "31d55bf0-b4ab-4ef1-bf20-cba54fbdcfac",
            "id": "855",
            "name": "Business",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "date_added": "13125955293492568",
            "guid": "64847935-53da-4311-9abb-8135a34a7cca",
            "id": "873",
            "name": "JavaScript: Understanding the Weird Parts - The First 3.5 Hours - YouTube",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://www.youtube.com/watch?v=Bv_5Zv5c-Ts"
         }, {
            "date_added": "13126230268915228",
            "guid": "f6ec6b15-2ddf-4919-994e-c218cb55b6bb",
            "id": "876",
            "name": "Git-Cheat-Sheet.md",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://gist.github.com/akras14/3d242d80af8388ebca60"
         }, {
            "date_added": "13129490150953690",
            "guid": "16a5fbdd-54bd-4938-bc02-f6d95da6ad46",
            "id": "899",
            "name": "2D Game Art for Programmers",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.2dgameartguru.com/"
         }, {
            "date_added": "13129605978088498",
            "guid": "3be9ed74-90a2-42e7-aff7-b293299a1e7a",
            "id": "900",
            "name": "We Really Don't Know How To Compute!",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://www.infoq.com/presentations/We-Really-Dont-Know-How-To-Compute"
         }, {
            "date_added": "13129685600997104",
            "guid": "f8bc96f5-95e6-451a-938f-e0326f9ed676",
            "id": "901",
            "name": "Multivariable calculus | Khan Academy",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://www.khanacademy.org/math/multivariable-calculus/"
         }, {
            "date_added": "13130729637615699",
            "guid": "90f7a4bc-d4b9-49fb-804e-b827151ad12d",
            "id": "905",
            "name": "Blockchain Demo",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://anders.com/blockchain/"
         }, {
            "date_added": "13134494882019701",
            "guid": "8206d92f-8781-438e-aa28-5623f4f722f5",
            "id": "925",
            "meta_info": {
               "last_visited_desktop": "13148551141168329"
            },
            "name": "Table of Contents · Crafting Interpreters",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.craftinginterpreters.com/contents.html"
         }, {
            "date_added": "13135801984726535",
            "guid": "385e3e14-4acd-456b-9c7c-c5ca57b09fe6",
            "id": "936",
            "meta_info": {
               "last_visited_desktop": "13135801984730079"
            },
            "name": "Fermat's Library | What is Life? annotated/explained version.",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://fermatslibrary.com/s/what-is-life"
         }, {
            "date_added": "13146522973197732",
            "guid": "b51ec35d-4e85-43d7-846f-bd42f666cc7b",
            "id": "980",
            "meta_info": {
               "last_visited_desktop": "13146522973200032"
            },
            "name": "The Partially Examined Life Philosophy Podcast | A Philosophy Podcast and Blog - Part 20",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://partiallyexaminedlife.com/most-recent-episodes/page/20/"
         }, {
            "date_added": "13146532872804881",
            "guid": "67e54aac-9e5a-4853-802f-4fb3da2fe9d7",
            "id": "981",
            "meta_info": {
               "last_visited_desktop": "13146532872808200"
            },
            "name": "Let's Play: Ancient Greek Punishment: CPU Edition!",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.pippinbarr.com/2017/04/12/lets-play-ancient-greek-punishment-cpu-edition/"
         }, {
            "date_added": "13152663801425512",
            "guid": "1f4d8395-8317-42e8-b892-5418170644f4",
            "id": "1012",
            "meta_info": {
               "last_visited_desktop": "13152663801431765"
            },
            "name": "mostly-adequate-guide (functional programming)",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://www.gitbook.com/book/drboolean/mostly-adequate-guide/details"
         }, {
            "date_added": "13157501112292686",
            "guid": "62d4de74-49af-4a80-8c86-e42c035ffb8d",
            "id": "1037",
            "meta_info": {
               "last_visited_desktop": "13167175660210781"
            },
            "name": "ΛIRMΛSH",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://airma.sh/"
         }, {
            "date_added": "13158274435642801",
            "guid": "17bea3ba-25ae-43ac-87ee-eb575ca1e6af",
            "id": "1041",
            "meta_info": {
               "last_visited_desktop": "13158274435646504"
            },
            "name": "OpenCollective - A New Form of Association, Transparent by Design",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://opencollective.com/"
         }, {
            "date_added": "13161728908773075",
            "guid": "b8c2dd9f-962e-41df-afb7-c20ad0be1673",
            "id": "1056",
            "meta_info": {
               "last_visited_desktop": "13161728908777708"
            },
            "name": "(Find a co-hacker) Project Board",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://projectboard.xyz/"
         }, {
            "date_added": "13172813119997583",
            "guid": "a001ef8d-1e14-4495-b3d8-b5ca0bcefacd",
            "id": "1099",
            "meta_info": {
               "last_visited_desktop": "13172813119999531"
            },
            "name": "DNA: The Code of Life (SHA2017) - YouTube",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://www.youtube.com/watch?v=EcGM_cNzQmE"
         }, {
            "children": [ {
               "date_added": "13173176604994382",
               "guid": "dd91e3da-4264-42bb-bb1b-2c0e6c076a80",
               "id": "1104",
               "meta_info": {
                  "last_visited_desktop": "13194752260501317"
               },
               "name": "Feather – Simply beautiful open source icons",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://feathericons.com/"
            }, {
               "date_added": "13173176638458890",
               "guid": "0c5182e5-9a23-4af5-bea0-f9d1eb063f79",
               "id": "1106",
               "meta_info": {
                  "last_visited_desktop": "13195277494545010"
               },
               "name": "SVG Icons Library - Vivid.js",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://webkul.github.io/vivid/"
            }, {
               "date_added": "13195255776664422",
               "guid": "2ef471cd-b187-4d57-a4c8-34d75b6792e1",
               "id": "1328",
               "meta_info": {
                  "last_visited_desktop": "13195277024093665"
               },
               "name": "ICONSVG - Quick customizable SVG icons for your project",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://iconsvg.xyz/"
            } ],
            "date_added": "13173176623265787",
            "date_modified": "13195260402694569",
            "guid": "05ff0f2b-f650-4dcf-9db1-613f5e3741d5",
            "id": "1105",
            "name": "Icons",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "date_added": "13173323869801523",
            "guid": "2a436632-b87a-4468-9567-0434dff574d3",
            "id": "1108",
            "meta_info": {
               "last_visited_desktop": "13173323869803986"
            },
            "name": "Leanpub: Publish Early, Publish Often",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://leanpub.com/"
         }, {
            "children": [ {
               "date_added": "13173680504153580",
               "guid": "1f7191cf-47ed-4e12-b9cc-2a804fcb0623",
               "id": "1111",
               "meta_info": {
                  "last_visited_desktop": "13173680504155623"
               },
               "name": "Installing Elixir & the Phoenix framework with Homebrew on OS X",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://gist.github.com/likethesky/abb00e5aedc38ee9f711"
            }, {
               "date_added": "13186013187077956",
               "guid": "55730bf6-ccbb-4d70-b718-17e95b8d95f3",
               "id": "1243",
               "meta_info": {
                  "last_visited_desktop": "13186013187079212"
               },
               "name": "Every elixir video",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://everyelixirvideo.page/"
            } ],
            "date_added": "13173680527972378",
            "date_modified": "13188992747582531",
            "guid": "9eeba5ed-2f35-4555-a285-13716c1e4bf8",
            "id": "1112",
            "name": "Elixir/Phoenix",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "date_added": "13175390576719863",
            "guid": "8c1f0768-8337-4ae0-aaa1-2dcb2b23a057",
            "id": "1117",
            "meta_info": {
               "last_visited_desktop": "13175390576744463"
            },
            "name": "Hacker News Hiring Trends - Most Popular Programming Languages",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://www.hntrends.com/"
         }, {
            "date_added": "13177135426042009",
            "guid": "79a43a14-5e4c-491b-b37f-23f1380b7c60",
            "id": "1133",
            "meta_info": {
               "last_visited_desktop": "13177135426044515"
            },
            "name": "An Introduction to Gradient Descent - Alan Zucconi",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://www.alanzucconi.com/2017/04/10/gradient-descent/"
         }, {
            "date_added": "13177135450425830",
            "guid": "8f279888-f2f8-45e1-8490-983872ba9800",
            "id": "1134",
            "meta_info": {
               "last_visited_desktop": "13177135450442202"
            },
            "name": "Procedural Animation tutorial",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://www.alanzucconi.com/2017/04/17/procedural-animations/"
         }, {
            "date_added": "13178238214269857",
            "guid": "82554bf3-0d04-454f-a217-5ed9597003f1",
            "id": "1146",
            "meta_info": {
               "last_visited_desktop": "13178238214287881"
            },
            "name": "The Holloway Guide to Equity Compensation — Holloway",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://www.holloway.com/g/equity-compensation"
         }, {
            "children": [ {
               "date_added": "13179416393832461",
               "guid": "89c87272-b3fe-4dbf-a872-1dd41599f310",
               "id": "1160",
               "meta_info": {
                  "last_visited_desktop": "13186787916691618"
               },
               "name": "Noise Functions and Map Generation",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.redblobgames.com/articles/noise/introduction.html"
            }, {
               "children": [ {
                  "date_added": "13179416837571082",
                  "guid": "2cb3c63e-db1c-4620-b060-883d17e48262",
                  "id": "1166",
                  "meta_info": {
                     "last_visited_desktop": "13195888539639843"
                  },
                  "name": "Components.utils.evalInSandbox - Mozilla | MDN",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Language_Bindings/Components.utils.evalInSandbox"
               }, {
                  "date_added": "13179416856596118",
                  "guid": "98e274e1-49e1-426b-8d3a-d51b06ed44c1",
                  "id": "1168",
                  "meta_info": {
                     "last_visited_desktop": "13179416856598401"
                  },
                  "name": "Introducing Runnable JavaScript, CSS, and HTML Code Snippets - Stack Overflow Blog",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://stackoverflow.blog/2014/09/16/introducing-runnable-javascript-css-and-html-code-snippets/"
               }, {
                  "date_added": "13179416862268329",
                  "guid": "b318f5db-b80f-485b-b81f-ae19989d5748",
                  "id": "1169",
                  "meta_info": {
                     "last_visited_desktop": "13180312137117895"
                  },
                  "name": "045: JavaScript Security - CodePen Blog",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://blog.codepen.io/2015/07/07/045-javascript-security/"
               }, {
                  "date_added": "13179416869103513",
                  "guid": "6f707315-cc06-459f-9769-b5e963f58159",
                  "id": "1170",
                  "meta_info": {
                     "last_visited_desktop": "13188266690630290"
                  },
                  "name": "Play safely in sandboxed IFrames - HTML5 Rocks",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/"
               }, {
                  "date_added": "13179416875822194",
                  "guid": "bb9f8c15-3ef9-4c52-8124-5be77e0af7c9",
                  "id": "1171",
                  "meta_info": {
                     "last_visited_desktop": "13188266700275336"
                  },
                  "name": "Sandboxing JavaScript – Zendesk Engineering – Medium",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://medium.com/zendesk-engineering/sandboxing-javascript-e4def55e855e"
               } ],
               "date_added": "13179416850325828",
               "date_modified": "13179448124025693",
               "guid": "866ec7ab-6865-4a34-983b-97a82a61f86c",
               "id": "1167",
               "name": "sandbox",
               "sync_transaction_version": "1",
               "type": "folder"
            }, {
               "date_added": "13180317145241124",
               "guid": "ec08e0f1-42bd-4f49-b7f4-39766f0da317",
               "id": "1175",
               "meta_info": {
                  "last_visited_desktop": "13180317145243332"
               },
               "name": "GoAccess - Visual Web Log Analyzer",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://goaccess.io/"
            } ],
            "date_added": "13179416509298358",
            "date_modified": "13180402892718845",
            "guid": "9f000c83-c977-447d-bad6-4b1343948c25",
            "id": "1162",
            "name": "Vector Toy",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13179416704418653",
               "guid": "73e6d049-dbaa-4101-b419-2a5fc924e2ed",
               "id": "1163",
               "meta_info": {
                  "last_visited_desktop": "13179416704424073"
               },
               "name": "GRID: A simple visual cheatsheet for CSS Grid Layout",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://grid.malven.co/"
            } ],
            "date_added": "13179416747227479",
            "date_modified": "13179416837571082",
            "guid": "ab505247-993d-41e9-9770-e07a66b76c93",
            "id": "1164",
            "name": "Reference",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13180649998758760",
               "guid": "469aa591-36d1-4362-8d70-6200d04d4251",
               "id": "1177",
               "meta_info": {
                  "last_visited_desktop": "13180649998790209"
               },
               "name": "Why Momentum Really Works",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://distill.pub/2017/momentum/"
            } ],
            "date_added": "13180650007152987",
            "date_modified": "13181013413812672",
            "guid": "62963f50-1c42-4996-81be-1b80381cbad7",
            "id": "1178",
            "name": "physics",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13181428334163445",
               "guid": "ca2c0606-af00-4e38-82d1-a37431fe7061",
               "id": "1183",
               "meta_info": {
                  "last_visited_desktop": "13181428334226208"
               },
               "name": "Relational Program Synthesis | Hacker News",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://news.ycombinator.com/item?id=17950194"
            }, {
               "date_added": "13181428352171626",
               "guid": "e9a20e63-d852-4467-9b8d-31ad097a4a3d",
               "id": "1185",
               "meta_info": {
                  "last_visited_desktop": "13182049485761266"
               },
               "name": "Launch HN: Synthetic Minds (YC S18) – Program Synthesis to Protect Dapps | Hacker News",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://news.ycombinator.com/item?id=17508562"
            } ],
            "date_added": "13181428344461650",
            "date_modified": "13181697634956919",
            "guid": "ad330111-93de-4580-a47e-3182d1d1d5da",
            "id": "1184",
            "name": "Serotiny",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13186012727638568",
               "guid": "f35bf6df-1750-4b0a-b1c4-ba3f9b513e3c",
               "id": "1241",
               "meta_info": {
                  "last_visited_desktop": "13186012727651157"
               },
               "name": "Refactoring UI",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://refactoringui.com/"
            } ],
            "date_added": "13186012745199963",
            "date_modified": "13186013187077956",
            "guid": "7f3a4952-aeed-4f3b-a627-ab4f9e778fc6",
            "id": "1242",
            "name": "Web design",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "date_added": "13188262712626450",
            "guid": "e800da7e-3e74-49f5-b20d-f5083037066b",
            "id": "1264",
            "meta_info": {
               "last_visited_desktop": "13188262712629002"
            },
            "name": "Complexity Explorer",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://www.complexityexplorer.org/courses"
         }, {
            "children": [ {
               "date_added": "13193441757940549",
               "guid": "37368edb-ed7b-424c-9955-abde09ceeb2d",
               "id": "1303",
               "meta_info": {
                  "last_visited_desktop": "13193441757953319"
               },
               "name": "Dialectics for new computer science - Salon des Refusés 2017 and 2018",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.shift-society.org/salon/papers/"
            }, {
               "date_added": "13193704633907508",
               "guid": "280b6a04-f098-493a-8f9a-10c652f66aaf",
               "id": "1307",
               "meta_info": {
                  "last_visited_desktop": "13193704663755207"
               },
               "name": "visual-programming-codex: Resources and references for the past and future of visual programming.",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/ivanreese/visual-programming-codex"
            }, {
               "date_added": "13193959566660139",
               "guid": "224cc7bd-8b1b-446c-a53c-6b7efafd3407",
               "id": "1310",
               "meta_info": {
                  "last_visited_desktop": "13193959566685746"
               },
               "name": "glance/README.md at master · rgleichman/glance",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/rgleichman/glance/blob/master/README.md#getting-started"
            } ],
            "date_added": "13193441833111919",
            "date_modified": "13193977733101790",
            "guid": "382b2f77-4f87-4d72-9675-640ccbc6380b",
            "id": "1304",
            "name": "Neo Editor",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13194137238238270",
               "guid": "43a6509a-5afa-48b8-99c8-a07a65cb4c87",
               "id": "1313",
               "meta_info": {
                  "last_visited_desktop": "13194137238245894"
               },
               "name": "Electronegativity - Tool To Identify Misconfigurations And Security Anti-Patterns In Electron Applications - KitPloit - PenTest & Hacking Tools for your CyberSecurity Kit ☣",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.kitploit.com/2019/02/electronegativity-tool-to-identify.html?utm_source=dlvr.it&utm_medium=twitter"
            }, {
               "date_added": "13194315284644789",
               "guid": "37b9d5c1-d5ff-41ec-b453-7fafe76f7dae",
               "id": "1316",
               "meta_info": {
                  "last_visited_desktop": "13194315284652415"
               },
               "name": "SEO For Web Engineers: 38 Hard-Earned Lessons and Tips",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.johnwdefeo.com/articles/seo-for-engineers"
            }, {
               "date_added": "13195183719674404",
               "guid": "d7e4c687-bcb9-4f56-88da-d493d8684696",
               "id": "1323",
               "meta_info": {
                  "last_visited_desktop": "13195183719679679"
               },
               "name": "Multi-threaded Rust 'find' tool source",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/sharkdp/fd/blob/master/src/walk.rs"
            }, {
               "children": [ {
                  "date_added": "13195184723752561",
                  "guid": "a0ad6cee-c4d8-46cb-85f3-33f670d91457",
                  "id": "1324",
                  "meta_info": {
                     "last_visited_desktop": "13195184723764845"
                  },
                  "name": "User Acquisition in the Microsoft Store: It’s (Almost) A Thing",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://medium.com/user-camp/windows-store-user-acquisition-40a61dba00e"
               }, {
                  "date_added": "13195184754132132",
                  "guid": "dca218ef-a7b2-4dfd-b25c-bf2bb065be32",
                  "id": "1326",
                  "meta_info": {
                     "last_visited_desktop": "13195184754143705"
                  },
                  "name": "Get more users for your apps and games with AdDuplex",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://www.adduplex.com/"
               } ],
               "date_added": "13195184749906063",
               "date_modified": "13195984901390030",
               "guid": "ccc319ff-f77c-4043-9805-2689fa94a972",
               "id": "1325",
               "name": "business",
               "sync_transaction_version": "1",
               "type": "folder"
            }, {
               "date_added": "13195184813990562",
               "guid": "ea30edd7-6cb8-4dde-a930-df8aed2e421a",
               "id": "1327",
               "meta_info": {
                  "last_visited_desktop": "13195184813991554"
               },
               "name": "Gradient banding issues - Computer Graphics Stack Exchange",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://computergraphics.stackexchange.com/questions/3964/opengl-specular-shading-gradient-banding-issues"
            }, {
               "date_added": "13195265270247295",
               "guid": "ddb1f8ff-bf22-4ed7-bc13-80c32db008b2",
               "id": "1334",
               "meta_info": {
                  "last_visited_desktop": "13197002517493482"
               },
               "name": "dutree/src at master · nachoparker/dutree",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/nachoparker/dutree/tree/master/src"
            }, {
               "children": [ {
                  "date_added": "13195348904261701",
                  "guid": "e93af520-dcfc-4b30-95ef-be32596dddfa",
                  "id": "1335",
                  "meta_info": {
                     "last_visited_desktop": "13195348904262659"
                  },
                  "name": "About Apple File System | Apple Developer Documentation",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://developer.apple.com/documentation/foundation/file_system/about_apple_file_system"
               }, {
                  "date_added": "13195348941574419",
                  "guid": "a3aab752-b561-4199-ae3e-de91e12397bb",
                  "id": "1337",
                  "meta_info": {
                     "last_visited_desktop": "13195348941575036"
                  },
                  "name": "FileManager - Foundation | Apple Developer Documentation",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://developer.apple.com/documentation/foundation/filemanager"
               }, {
                  "date_added": "13195348947142085",
                  "guid": "d6de8d28-cf69-4aac-b15f-8cca7c1bd28f",
                  "id": "1338",
                  "meta_info": {
                     "last_visited_desktop": "13195348947152024"
                  },
                  "name": "(fast) Cocoabuilder - (Daniel Jalkut) Re: Obtain directory size.",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://web.archive.org/web/20080907020151/http://www.cocoabuilder.com/archive/message/cocoa/2005/5/20/136503"
               } ],
               "date_added": "13195348923459913",
               "date_modified": "13195607482136358",
               "guid": "e4dbcb5b-5b3d-48ad-a6e0-5eb5b034efa9",
               "id": "1336",
               "name": "Mac specific",
               "sync_transaction_version": "1",
               "type": "folder"
            }, {
               "date_added": "13195607482136358",
               "guid": "6a9def01-7ad1-47f9-95ad-80883bd8c3c5",
               "id": "1339",
               "meta_info": {
                  "last_visited_desktop": "13195607482146171"
               },
               "name": "Rendering Text in WebVR | David Lyons",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://davidscottlyons.com/projects/text-sdf-bitmap/"
            }, {
               "date_added": "13195607619685103",
               "guid": "96adcc92-b1cf-4383-940d-230ee5f5fc3f",
               "id": "1340",
               "meta_info": {
                  "last_visited_desktop": "13195607619685954"
               },
               "name": "Better Quality Text in WebGL - Stack Overflow",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://stackoverflow.com/questions/25956272/better-quality-text-in-webgl"
            }, {
               "date_added": "13195742390519473",
               "guid": "7ca51696-4037-4971-9126-05da079d8fb9",
               "id": "1343",
               "meta_info": {
                  "last_visited_desktop": "13195742390526597"
               },
               "name": "THREE.BAS Examples",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://three-bas-examples.surge.sh/"
            }, {
               "date_added": "13195776897402156",
               "guid": "2e82fe30-a4b4-4eff-a5ba-ce2d9761d64a",
               "id": "1344",
               "meta_info": {
                  "last_visited_desktop": "13196899110236491"
               },
               "name": "sharkdp/fd: A simple, fast and user-friendly alternative to 'find'",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/sharkdp/fd"
            }, {
               "date_added": "13195776928645350",
               "guid": "07596951-5ade-49c4-ba38-bca175f803b5",
               "id": "1345",
               "meta_info": {
                  "last_visited_desktop": "13195776928646031"
               },
               "name": "(probably not as fast) Find files (ff) by name!",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/vishaltelangre/ff"
            }, {
               "date_added": "13195778308809491",
               "guid": "f83f9f5c-91db-4d68-a2c1-302ae81ec8f5",
               "id": "1346",
               "meta_info": {
                  "last_visited_desktop": "13195778308810608"
               },
               "name": "broot/file_sizes.rs at master · Canop/broot",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/Canop/broot/blob/master/src/file_sizes.rs"
            }, {
               "date_added": "13195780352261973",
               "guid": "28c85566-2eb4-4d78-aca6-8bfaf3f680fe",
               "id": "1347",
               "meta_info": {
                  "last_visited_desktop": "13195780352262631"
               },
               "name": "Local File Systems - Windows applications | Microsoft Docs",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://docs.microsoft.com/en-us/windows/desktop/fileio/file-systems"
            }, {
               "date_added": "13195783416475867",
               "guid": "2c939ec7-5424-4941-a51e-cda70e6cdcdf",
               "id": "1348",
               "meta_info": {
                  "last_visited_desktop": "13196725455533333"
               },
               "name": "fs-extra - npm",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.npmjs.com/package/fs-extra"
            }, {
               "date_added": "13195783526507732",
               "guid": "8ba47974-19d5-4d9b-bd78-a511b790bdb4",
               "id": "1349",
               "meta_info": {
                  "last_visited_desktop": "13195783526508610"
               },
               "name": "get-folder-size - npm",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.npmjs.com/package/get-folder-size"
            }, {
               "children": [ {
                  "date_added": "13196921030903752",
                  "guid": "567fa0b7-8edb-46e6-826c-9d5d1c818ad6",
                  "id": "1364",
                  "meta_info": {
                     "last_visited_desktop": "13196921030903920"
                  },
                  "name": "fs-walk - npm",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://www.npmjs.com/package/fs-walk"
               }, {
                  "date_added": "13196921067508194",
                  "guid": "dc77eb7c-df23-4b4e-9078-924ed84b8d4a",
                  "id": "1365",
                  "meta_info": {
                     "last_visited_desktop": "13196921067508316"
                  },
                  "name": "walkdir - npm",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://www.npmjs.com/package/walkdir"
               }, {
                  "date_added": "13196921089230699",
                  "guid": "b63178d5-1e4f-4b46-ae6f-82973424c1b4",
                  "id": "1366",
                  "meta_info": {
                     "last_visited_desktop": "13196921089230816"
                  },
                  "name": "walker - npm",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://www.npmjs.com/package/walker"
               }, {
                  "date_added": "13196921094315045",
                  "guid": "0327ed9c-faee-4923-81f1-8cab2820e284",
                  "id": "1367",
                  "meta_info": {
                     "last_visited_desktop": "13196921094315180"
                  },
                  "name": "filewalker - npm",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://www.npmjs.com/package/filewalker"
               }, {
                  "date_added": "13207362027556181",
                  "guid": "74a84fef-369f-459e-97f2-68bd3df0628f",
                  "id": "1410",
                  "name": "video-thumbnail-generator - npm",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://www.npmjs.com/package/video-thumbnail-generator"
               }, {
                  "date_added": "13207362072670593",
                  "guid": "b5e593ae-54b4-4ca5-8de1-bad03a014e01",
                  "id": "1411",
                  "name": "pdf-thumbnail - npm",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://www.npmjs.com/package/pdf-thumbnail"
               }, {
                  "date_added": "13209164089331846",
                  "guid": "47bdfbf9-07e2-477a-91ec-d25f0540bff8",
                  "id": "1423",
                  "name": "windows-network-drive - npm",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://www.npmjs.com/package/windows-network-drive"
               }, {
                  "date_added": "13215046261479464",
                  "guid": "2b628230-8b83-4917-82e8-7822379beae3",
                  "id": "1477",
                  "name": "electron-elements/send-feedback: send-feedback electron element - that could be used to get user feedback from electron app",
                  "type": "url",
                  "url": "https://github.com/electron-elements/send-feedback"
               }, {
                  "date_added": "13215046283063134",
                  "guid": "ebcceb01-157d-44bb-b1b0-45a5e64e1c44",
                  "id": "1478",
                  "name": "rhysd/electron-about-window: 'About This App' mini-window for Electron apps",
                  "type": "url",
                  "url": "https://github.com/rhysd/electron-about-window"
               } ],
               "date_added": "13196921064294473",
               "date_modified": "13215046298072649",
               "guid": "d9d53060-bc91-40ad-86d1-129990183009",
               "id": "1363",
               "name": "node libs",
               "sync_transaction_version": "1",
               "type": "folder"
            }, {
               "date_added": "13208575321421054",
               "guid": "08caea3f-837f-4781-bb75-fdaa0bae4bb6",
               "id": "1414",
               "name": "electron/node: Node fork to make it suitable for embedding in Electron",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/electron/node"
            }, {
               "date_added": "13208575505016293",
               "guid": "47a2e14b-e8d9-4df7-a668-2c80f0f68951",
               "id": "1415",
               "name": "Compiling from Rust to WebAssembly - WebAssembly | MDN",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm"
            }, {
               "date_added": "13208575667308841",
               "guid": "8f77ff6e-4d5d-4a42-9e18-0d6a0793e8a1",
               "id": "1416",
               "name": "DrSensor/rollup-plugin-rust: A rollup plugin that compile Rust code into WebAssembly modules",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/DrSensor/rollup-plugin-rust"
            }, {
               "date_added": "13209637744267974",
               "guid": "80bbd71b-c71c-4f6e-ae4e-32305feec659",
               "id": "1429",
               "name": "Master File Table - Windows applications | Microsoft Docs",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://docs.microsoft.com/en-us/windows/win32/fileio/master-file-table"
            }, {
               "date_added": "13209637794680261",
               "guid": "318ce1bc-4a1c-4b5d-bf71-f2b559a27eba",
               "id": "1430",
               "name": "TreeSize Free - Quickly Scan Directory Sizes and Find Space Hogs",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.jam-software.com/treesize_free/"
            }, {
               "date_added": "13209637957357532",
               "guid": "39616328-d2db-428c-95ec-6518b7bd5989",
               "id": "1431",
               "name": "johnthagen/min-sized-rust: 🦀 How to minimize Rust binary size 📦",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://github.com/johnthagen/min-sized-rust"
            }, {
               "date_added": "13209694410776595",
               "guid": "d3af6362-1562-4635-83b0-617a4a5d192f",
               "id": "1433",
               "name": "Translation Developer Tool for Localization and Internationalization of Applications - Lang",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.langapi.co/"
            }, {
               "date_added": "13211538816928524",
               "guid": "28ced539-3406-441f-8030-076713d76dc9",
               "id": "1444",
               "name": "SpriteStack.io",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://spritestack.io/"
            }, {
               "date_added": "13212516980265647",
               "guid": "fbca319f-9e6e-48ef-9c7b-a504f16f82db",
               "id": "1456",
               "name": "Launch HN: Lang (YC S19) – Internationalization Built for Devs | Hacker News",
               "sync_transaction_version": "23",
               "type": "url",
               "url": "https://news.ycombinator.com/item?id=20627137"
            }, {
               "date_added": "13215046298072649",
               "guid": "5ad3e003-12a5-4d33-a59e-5fd911bd4af0",
               "id": "1479",
               "name": "Custom Email Domain via Gmail when GitHub Pages is Your Web Host",
               "type": "url",
               "url": "https://blog.johansen.software/custom-email-domain-via-gmail-when-github-pages-is-your-web-host-e4a9d7e03d36"
            } ],
            "date_added": "13194137277517661",
            "date_modified": "13215400718623533",
            "guid": "dc755bd0-71c9-4e8d-9422-88786cdcebe4",
            "id": "1314",
            "name": "Disk Analyzer",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "date_added": "13195260402694569",
            "guid": "7383d76d-1056-4007-93ef-0c01a388d70f",
            "id": "1330",
            "meta_info": {
               "last_visited_desktop": "13195260402695557"
            },
            "name": "Lectures · hacker tools",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://hacker-tools.github.io/lectures/"
         }, {
            "date_added": "13195261280725206",
            "guid": "2d4bca9c-4946-47e2-8235-b92f2e9275af",
            "id": "1332",
            "meta_info": {
               "last_visited_desktop": "13195261280725813"
            },
            "name": "tapio/live-server: A simple development http server with live reload capability.",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://github.com/tapio/live-server"
         }, {
            "date_added": "13195263895275806",
            "guid": "b19850bf-ac45-4e08-8c8a-cae13d1acfed",
            "id": "1333",
            "meta_info": {
               "last_visited_desktop": "13195263895276466"
            },
            "name": "Can one explain schemes to biologists",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.dam.brown.edu/people/mumford/blog/2014/Grothendieck.html"
         }, {
            "children": [ {
               "date_added": "13196212824645483",
               "guid": "496e1f9d-8343-4547-ac86-2b41caf1fc4f",
               "id": "1354",
               "meta_info": {
                  "last_visited_desktop": "13196212840299061"
               },
               "name": "Vectary 3.0 | What's new in the 3D design tool - YouTube",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.youtube.com/watch?v=0dC1ZRdf9JM"
            } ],
            "date_added": "13196212861425135",
            "date_modified": "13196240234929968",
            "guid": "9ff0cc21-7d82-4cdb-ae69-18079921d8f3",
            "id": "1353",
            "name": "CAD dev stuff",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13205202122361933",
               "guid": "7d2f9c27-ea93-4121-a129-f6eee137b0e5",
               "id": "1404",
               "name": "Relearn CSS layout: Every Layout",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://every-layout.dev/"
            } ],
            "date_added": "13205202177430757",
            "date_modified": "13205209685590709",
            "guid": "b9f34e51-c0ab-438f-8cac-6a9452ca911e",
            "id": "1403",
            "name": "learning front-end",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "children": [ {
               "date_added": "13208772569691513",
               "guid": "5e657763-df4f-45fc-adf7-230c59610623",
               "id": "1418",
               "name": "Shape analysis (spring 2019), Lecture 1: Introduction - YouTube",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.youtube.com/watch?v=GEljqHZb30c&feature=youtu.be"
            }, {
               "date_added": "13208772603449094",
               "guid": "96f1e4dc-096b-41f4-b87a-4611734d95ab",
               "id": "1420",
               "name": "GDP @ MIT: Courses",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://groups.csail.mit.edu/gdpgroup/6838_spring_2019.html"
            } ],
            "date_added": "13208772589828076",
            "date_modified": "13208772603449094",
            "guid": "dabefb41-d533-4e75-9a85-f3714914497f",
            "id": "1419",
            "name": "computational geometry",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "date_added": "13209290798972049",
            "guid": "e78c439d-53a2-4687-8c3e-98b834c434ab",
            "id": "1426",
            "name": "Tiles are back baby!",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.ice.org/tiles/"
         }, {
            "date_added": "13209642977473562",
            "guid": "6666ebe1-7966-4ba8-b97c-ba4c7f88daa0",
            "id": "1432",
            "name": "Perils of Constructors",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://matklad.github.io/2019/07/16/perils-of-constructors.html"
         }, {
            "children": [ {
               "date_added": "13209791311992151",
               "guid": "712093c4-d761-4eb2-90c6-5047b34c2c44",
               "id": "1434",
               "name": "Acuity Chair By Allsteel Highly Adjustable Model Gray Seat",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://seatingmind.com/acuity-chair-by-allsteel-highly-adjustable-model-gray-seat/?gclid=Cj0KCQjwkK_qBRD8ARIsAOteukCRVZB_wC8aTFvXZgG4mHdRpeZ3q1IEw-d7LT49oc09_ON53TefrvAaAp9vEALw_wcB"
            }, {
               "date_added": "13209791401101058",
               "guid": "dceb98e8-4bcc-4927-9b43-a0fe2b960ed5",
               "id": "1436",
               "name": "An Unusual Ergonomic Office Chair - HAG Capisco - YouTube",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.youtube.com/watch?v=DhH5mbZ9j5c"
            }, {
               "date_added": "13216784092297682",
               "guid": "07588428-4de5-47b2-9157-7f90e73f6474",
               "id": "1486",
               "name": "Amazon.com: Logitech MX Vertical Wireless Mouse – Advanced Ergonomic Design Reduces Muscle Strain, Control and Move Content Between 3 Windows and Apple Computers (Bluetooth or USB), Rechargeable, Graphite: Computers & Accessories",
               "type": "url",
               "url": "https://www.amazon.com/Logitech-Vertical-Wireless-Mouse-Rechargeable/dp/B07FNJB8TT"
            }, {
               "date_added": "13216784246895372",
               "guid": "b17392f8-a8d5-4363-98ca-3467dc7581e4",
               "id": "1487",
               "name": "Amazon.com: Keychron K2 Bluetooth Wireless Mechanical Keyboard with Gateron Brown Switch/White LED Backlit/USB C/Anti Ghosting/N-Key Rollover/Compact Design, 84 Key Tenkeyless Keyboard for Mac Windows: MP3 Players & Accessories",
               "type": "url",
               "url": "https://www.amazon.com/Keychron-Bluetooth-Wireless-Mechanical-Tenkeyless-Keyboard/dp/B07QBPDWLS"
            } ],
            "date_added": "13209791397931040",
            "date_modified": "13216859707929432",
            "guid": "5a330c1e-3dbb-42b0-803a-1ef9cf0ac8e6",
            "id": "1435",
            "name": "ergonomic things",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "date_added": "13219210133671744",
            "guid": "a13d91bb-94c8-47f9-89f0-97a51446dcaf",
            "id": "1493",
            "name": "The Guy I Almost Was | Graphic Novel by Patrick Sean Farley",
            "type": "url",
            "url": "http://electricsheepcomix.com/almostguy/"
         } ],
         "date_added": "13057014281447272",
         "date_modified": "13219487509586318",
         "guid": "00000000-0000-4000-A000-000000000002",
         "id": "1",
         "name": "Bookmarks Bar",
         "type": "folder"
      },
      "other": {
         "children": [ {
            "children": [ {
               "date_added": "12873681912000000",
               "guid": "676318af-dc59-4bb6-81fb-23fac6342c60",
               "id": "69",
               "name": "Nelnet Loans",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://www.nelnet.com/"
            }, {
               "date_added": "12873682255000000",
               "guid": "0a316f3a-15c4-415d-8ca6-4194910a6398",
               "id": "70",
               "name": "ACS :: Borrower Login",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.acs-education.com/CS/Jsp/general/home.jsp"
            }, {
               "date_added": "12873683342000000",
               "guid": "e6d87403-d6fa-4383-9093-b83024795fa2",
               "id": "71",
               "name": "Chase Student Loan Servicing",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://www.chase.com/ccp/index.jsp?pg_name=ccpmapp/student_loans/servicing/page/servicing_home"
            }, {
               "children": [ {
                  "date_added": "12941181927000000",
                  "guid": "1679df6b-db94-4c1d-910e-b9e1c1ab97e5",
                  "id": "74",
                  "name": "Private Student Loan Consolidation Interest Rates",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://www.studentloanconsolidator.com/private/private-student-loan-consolidation-interest-rates.php"
               }, {
                  "date_added": "12941181939000000",
                  "guid": "b2b26ab8-1bb6-42b9-b794-035ac6254327",
                  "id": "75",
                  "name": "Wells Fargo Student Loans - Consolidate Private Loans",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "https://www.wellsfargo.com/student/consolidateloans/privatestudentloans"
               }, {
                  "date_added": "12941181951000000",
                  "guid": "570a8f53-7a0c-4f8a-8ecf-e7f6af6c5521",
                  "id": "76",
                  "name": "(informational)FinAid | Loans | Private Student Loan Consolidation",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://www.finaid.org/loans/privateconsolidation.phtml"
               }, {
                  "date_added": "12941183764000000",
                  "guid": "e7e29bb3-2620-433b-922b-81afe154792e",
                  "id": "77",
                  "name": "Borrower Services - What Loans Can I Consolidate?",
                  "sync_transaction_version": "1",
                  "type": "url",
                  "url": "http://loanconsolidation.ed.gov/borrower/bloans.html"
               } ],
               "date_added": "12953862981799000",
               "date_modified": "13125517336683328",
               "guid": "e56bb4ea-c6d3-4f8e-8e4f-f6817aa947d7",
               "id": "72",
               "name": "consolidation",
               "sync_transaction_version": "1",
               "type": "folder"
            }, {
               "date_added": "12950324861000000",
               "guid": "92901e8c-3adc-4bfb-b988-49adcf60b971",
               "id": "73",
               "name": "Direct Consolidation Loan - Borrower Services",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "https://loanconsolidation.ed.gov/AppEntry/apply-online/appindex.jsp"
            } ],
            "date_added": "12953862981798000",
            "date_modified": "13125444286032902",
            "guid": "3b1f2591-bac5-4761-843a-5a961923901a",
            "id": "15",
            "name": "Student Loans",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "date_added": "12882349781000000",
            "guid": "6e802f27-b9e7-43c9-9ce9-067b8d539c83",
            "id": "25",
            "name": "Amazon.com: Programming Language Pragmatics, Second Edition: Michael L. Scott: Books",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.amazon.com/Programming-Language-Pragmatics-Second-Michael/dp/0126339511/ref=sr_1_1?ie=UTF8&s=books&qid=1237874886&sr=1-1"
         }, {
            "date_added": "12938219703000000",
            "guid": "4fb8830c-7083-4943-a8ab-df5d9e7a6752",
            "id": "36",
            "name": "Amazon.com: Thermodynamics (9780486603612): Enrico Fermi: Books",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.amazon.com/Thermodynamics-Enrico-Fermi/dp/048660361X/ref=sr_1_1?s=books&ie=UTF8&qid=1293745682&sr=1-1"
         }, {
            "date_added": "12938347448000000",
            "guid": "e3eeccda-de14-4405-828c-6aac3b27294c",
            "id": "38",
            "name": "Amazon.com: An Introduction to Information Theory (9780486240619): John R. Pierce: Books",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.amazon.com/Introduction-Information-Theory-John-Pierce/dp/0486240614/ref=sr_1_1?s=books&ie=UTF8&qid=1293873131&sr=1-1"
         }, {
            "date_added": "12943489517000000",
            "guid": "b01e754d-c2eb-4a3c-aef9-43d543b54235",
            "id": "45",
            "name": "Amazon.com: London: The Biography (9780385497718): Peter Ackroyd: Books",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.amazon.com/London-Biography-Peter-Ackroyd/dp/0385497717/ref=pd_bxgy_b_img_b"
         }, {
            "date_added": "13075354575192000",
            "guid": "665e5bab-3e43-4854-af20-8aeea93b0811",
            "id": "759",
            "name": "Let's Build a Compiler",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://compilers.iecc.com/crenshaw/"
         }, {
            "date_added": "13075595220174000",
            "guid": "14052d42-b9bd-4404-9461-3b913ba1b034",
            "id": "762",
            "name": "OpenGL Step by Step - OpenGL Development",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://ogldev.atspace.co.uk/"
         }, {
            "children": [ {
               "date_added": "13075838676098000",
               "guid": "bbc1eb78-3ddf-4c17-af32-89c622221ee9",
               "id": "768",
               "name": "Top 10 Most Common Android Development Mistakes - Simply the best Tutorial",
               "sync_transaction_version": "1",
               "type": "url",
               "url": "http://simply-tutorial.com/blog/2015/01/30/top-10-most-common-android-development-mistakes/"
            } ],
            "date_added": "13075838692741547",
            "date_modified": "13075838692754761",
            "guid": "5118f5d4-d211-4758-ad67-2d44622643ec",
            "id": "769",
            "name": "Android Dev",
            "sync_transaction_version": "1",
            "type": "folder"
         }, {
            "date_added": "13077741792461144",
            "guid": "b562c42d-66f2-4b02-b7f8-aa38b4341925",
            "id": "777",
            "name": "Heritability: a handy guide to what it means, what it doesn’t mean, and that giant meta-analysis of twin studies | Scientia Salon",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "https://scientiasalon.wordpress.com/2015/06/01/heritability-a-handy-guide-to-what-it-means-what-it-doesnt-mean-and-that-giant-meta-analysis-of-twin-studies/"
         } ],
         "date_added": "13057014281447281",
         "date_modified": "13176951849276006",
         "guid": "00000000-0000-4000-A000-000000000003",
         "id": "2",
         "name": "Other Bookmarks",
         "type": "folder"
      },
      "sync_transaction_version": "77",
      "synced": {
         "children": [ {
            "date_added": "13066281575806478",
            "guid": "2886dfa0-d74f-47d4-a0a1-f2a7f084b128",
            "id": "663",
            "name": "BBC",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.bbc.co.uk/"
         }, {
            "date_added": "13066281575746559",
            "guid": "c357ca15-4091-4fa0-a756-e040b150ed7b",
            "id": "660",
            "name": "Weather Channel",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://sprint.xhtml.weather.com/xhtml/"
         }, {
            "date_added": "13066281575650898",
            "guid": "b9ca3939-4c4c-4c4a-9c0d-24a761df0f78",
            "id": "659",
            "name": "ESPN",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://m.espn.go.com/wireless/index?z=SP"
         }, {
            "date_added": "13066281575584663",
            "guid": "d7e8e30c-5dc4-4d85-b1b7-ea124ceb8763",
            "id": "661",
            "name": "CNN",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://sprint.mw.cnn.com/"
         }, {
            "date_added": "13066281575526737",
            "guid": "1fcc7444-8af3-4627-b0e6-4511986e8243",
            "id": "658",
            "name": "eBay",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.ebay.com/"
         }, {
            "date_added": "13066281575466696",
            "guid": "b2587874-cd82-4a82-a13b-6582c2dae291",
            "id": "662",
            "name": "Facebook",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://m.facebook.com/?sprint"
         }, {
            "date_added": "13066281575406328",
            "guid": "6fb14da9-e1fa-4865-9066-323d0e4092b4",
            "id": "655",
            "name": "Yahoo!",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://us.m.yahoo.com/?.tsrc-sprint"
         }, {
            "date_added": "13066281575353056",
            "guid": "d561e4a2-3ea7-4f02-aa13-9c17ef340294",
            "id": "656",
            "name": "Picasa",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://picasaweb.google.com/"
         }, {
            "date_added": "13066281575306000",
            "guid": "46901651-e965-4134-adc9-080156272ac1",
            "id": "654",
            "meta_info": {
               "last_visited": "13159105958794271",
               "last_visited_desktop": "13205842247016626"
            },
            "name": "Google",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://www.google.com/"
         }, {
            "date_added": "13066281575241021",
            "guid": "2e74d363-20b2-4e34-8ff9-12cb743efd35",
            "id": "657",
            "name": "Sprint Web",
            "sync_transaction_version": "1",
            "type": "url",
            "url": "http://sprint.com/powerdeck"
         } ],
         "date_added": "13057014281447285",
         "date_modified": "13196160973804512",
         "guid": "00000000-0000-4000-A000-000000000004",
         "id": "3",
         "name": "Mobile Bookmarks",
         "type": "folder"
      }
   },
   "sync_metadata": "asdf",
   "version": 1
}
`

const bookmarksTree = JSON.parse(data).roots.bookmark_bar
const names = new Set()

Util.walkDepthFirst(bookmarksTree, (node, parent) => {
    node.parent = parent
    names.add(node.name.split(" ")[0])
})

Util.setTagNames(Array.from(names))

Util.walkDepthFirst(bookmarksTree, (node, parent) => {
    node.tags = []
    const rand = Math.round(Math.random() * 4 + 1)
    for (let index = 0; index < rand; index++) {
        node.tags.push(Util.getRandomTagName())
        
    }
})