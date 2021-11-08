<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml' lang='es'>

<head>
    <title>Unidad 1 | Ejercicio 1: 4b</title>
    <?php include $_SERVER["DOCUMENT_ROOT"] . "/common/head.html"; ?>
</head>

<body>
    <?php include $_SERVER["DOCUMENT_ROOT"] . "/common/sidenav.html"; ?>

    <div id="main" class="main">
        <div class="header">
            <h1>Área y longitud de una circunferencia</h1>
        </div>

        <form id="form" action="#" method="post" class="form__columns">
            <label for="radius" class="form__radio-label">Introduce el radio en cm: </label>
            <input type="number" placeholder="0.00" name="radius" id="radius" min="0" step="0.01" onkeyup="validateNumber(this)" pattern="^\d+(?:\.\d{1,2})?$" required>
            <button class="form__btn form__btn--submit" name="submit" value="submit" type="submit">Calcular</button>
        </form>

        <?php
        require_once $_SERVER["DOCUMENT_ROOT"] . "/php/filter.php";

        if (isset($_POST["submit"]) && $_SERVER["REQUEST_METHOD"] == "POST") {
            if (empty($_POST["radius"])) {
                $radiusErr = "Se requiere el radio";
            } else {
                $radius = filter($_POST["radius"]);
                $length = 2 * pi() * $radius;
                $area = pi() * $radius ** 2;
            }
        ?>
            <div>
                <p class="form__results <?php (empty($radius) ? "" : "form__results--lose"); ?>">
                    <?php
                    if (!isset($radiusErr)) {
                        echo "Has introducido un radio de $radius cm.<br>";
                        echo "La <strong>longitud</strong> de la circunferencia es " . round($length, 2) . " cm.<br>";
                        echo "El <strong>área</strong> de la circunferencia es " . round($area, 2) . " cm.";
                    } else {
                        echo $radiusErr;
                    }
                    ?></p>
            </div>
        <?php } ?>

    </div>

    <?php include $_SERVER["DOCUMENT_ROOT"] . "/common/footer.html"; ?>
    <?php include $_SERVER["DOCUMENT_ROOT"] . "/common/floating-buttons.html"; ?>
</body>

</html>