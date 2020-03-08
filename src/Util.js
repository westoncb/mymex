import md5 from 'md5'

class Util {    

    static walkDepthFirst(node, func, parent = null) {
        const stop = func(node, parent)

        if (stop) {
            return
        } else {
            (node.children || []).forEach(child => {
                Util.walkDepthFirst(child, func, node)  
            });
        }
    }

    static nodeToPath(node, startOmitCount, endOmitCount) {
        const parts = [node.name]

        let curNode = node.parent
        while(curNode) {
            parts.push(curNode.name)
            curNode = curNode.parent
        }

        const rootPart = parts[parts.length-1]
        parts.length -= startOmitCount
        parts.reverse()
        parts.length = Math.max(0, parts.length - endOmitCount)

        if (parts.length === 0)
            parts.push(rootPart)

        const path = parts.join("/") + "/"
        

        return path
    }

    static lineageLength(node) {
        let length = 1
        let curNode = node.parent
        while (curNode) {
            length++
            curNode = curNode.parent
        }

        console.log("lineage length", length)

        return length
    }

    static isLeaf(node) {
        return !node.children || node.children.length === 0
    }

    static setTagNames(names) {
        Util.tagNames = names
    }

    static getRandomTagName() {
        return Util.tagNames[Math.floor((Util.tagNames.length-1)*Math.random())]
    }

    static idFromPath(path) {
        return md5(path.toLowerCase())
    }

    static uniq(array, propName) {
        const seen = {}
        return array.filter(element => seen.hasOwnProperty(element[propName]) ? false : (seen[element[propName]] = true))
    }

    /**
     * Returns the elements in array1 which are not in array2
     */
    static arrayDifference(array1, array2, propName) {
        const ar2Set = new Set(array2.map(element => element[propName]))
        return array1.filter(element => !ar2Set.has(element[propName]))
    }
}

export default Util