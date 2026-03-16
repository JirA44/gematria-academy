$files = Get-ChildItem -Path "C:\Users\Hugop\gematria-academy-deploy\pages" -Recurse -Filter "*.html"
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $newContent = $content -replace 'href="index\.html"', 'href="../../index.html"'
    $newContent = $newContent -replace "href='index\.html'", "href='../../index.html'"
    if ($content -ne $newContent) {
        Set-Content $file.FullName $newContent -NoNewline -Encoding UTF8
        Write-Host "Fixed: $($file.Name)"
    }
}
Write-Host "Done!"
