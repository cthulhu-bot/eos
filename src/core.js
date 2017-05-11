let gl
let shaderProgram

const initGL = () => {
    let canvas = document.getElementById("canvas")
    console.log(canvas)
    gl = canvas.getContext("webgl")
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0, 0, 0, 1)
}

const draw = () => {
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, 1)
}

const createShaders = () => {
    let vs = "";
    vs += "attribute vec4 coords;"
    vs += "attribute float pointSize;"
    vs += "void main(void) {"
//    vs += "  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);"
//    vs += "  gl_PointSize = 100.0;"
    vs += "  gl_Position = coords;"
    vs += "  gl_PointSize = pointSize;"
    vs += "}"

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vs)
    gl.compileShader(vertexShader)

    let fs = ""
    fs += "precision mediump float;"
    fs += "uniform vec4 color;"
    fs += "void main(void) {"
    //    fs += "  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);"
    fs += "  gl_FragColor = color;"
    fs += "}"

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fs)
    gl.compileShader(fragmentShader)

    shaderProgram = gl.createProgram()
    gl.attachShader(shaderProgram, vertexShader)
    gl.attachShader(shaderProgram, fragmentShader)
    gl.linkProgram(shaderProgram)
    gl.useProgram(shaderProgram)
}

const createVertices = () => {
    var coords = gl.getAttribLocation(shaderProgram, "coords")
    // (x, y, alpha)
    gl.vertexAttrib3f(coords, 0.5, 0.0, 0.0)

    var pointSize = gl.getAttribLocation(shaderProgram, "pointSize")
    gl.vertexAttrib1f(pointSize, 50.0)

    var color = gl.getUniformLocation(shaderProgram, "color")
    // (r, g, b, alpha)
    gl.uniform4f(color, 0.0, 0.0, 0.0, 0.0)
}

initGL()
createShaders()
createVertices()
draw()
