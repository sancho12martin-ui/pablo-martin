// @ts-nocheck
import { useState, useRef, useMemo } from 'react'
import { Button, Card, Checkbox, Dialog, Select, Text, TextInput } from '@sanity/ui'
import { insert, setIfMissing, type ArrayOfObjectsInputProps } from 'sanity'

const cle = () => Math.random().toString(36).slice(2, 14)

// Espacement en pixels : modifiez ces valeurs pour ajuster
const ECART_CHAMPS = 40   // écart entre deux champs
const ECART_LABEL = 12    // écart entre un titre et son champ

const bloc = { display: 'flex', flexDirection: 'column', gap: ECART_LABEL }

// Postes cochés ⭐ par défaut (comparaison sans accents ni majuscules)
const norm = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

const POSTES_AFFICHES_PAR_DEFAUT = ['producteur', 'assistant camera', 'assistante camera', 'prestataire']

export const afficheParDefaut = (poste: string) => {
  const p = norm(poste || '')
  return p === 'production' || POSTES_AFFICHES_PAR_DEFAUT.some((motif) => p.includes(motif))
}

export function makeCreditsInput(postes: string[]) {
  // Ordre alphabétique (accents et majuscules ignorés)
  const postesTries = [...postes].sort((a, b) =>
    a.localeCompare(b, 'fr', { sensitivity: 'base' })
  )

  return function CreditsInput(props: ArrayOfObjectsInputProps) {
    const [ouvert, setOuvert] = useState(false)
    const [poste, setPoste] = useState('')
    const [custom, setCustom] = useState('')
    const [noms, setNoms] = useState('')
    const [afficher, setAfficher] = useState(false)
    const [compteur, setCompteur] = useState(0)
    const posteRef = useRef<HTMLSelectElement>(null)

    // Postes déjà utilisés dans les crédits du film
    const dejaUtilises = useMemo(() => {
      const s = new Set<string>()
      for (const c of (props.value as any[]) || []) {
        if (c?.poste) s.add(c.poste)
        if (c?.posteCustom) s.add(c.posteCustom.trim())
      }
      return s
    }, [props.value])

    const posteFinal = poste || custom.trim()
    const liste = noms.split(/[·,]/).map((n) => n.trim()).filter(Boolean)
    const pret = posteFinal !== '' && liste.length > 0

    const choisirPoste = (valeur: string) => {
      setPoste(valeur)
      setAfficher(valeur ? afficheParDefaut(valeur) : false)
    }

    const reset = () => {
      setPoste(''); setCustom(''); setNoms(''); setAfficher(false)
    }

    const enregistrer = () => {
      const item: any = { _key: cle(), _type: 'object', noms: liste, afficher }
      if (poste) item.poste = poste
      else item.posteCustom = custom.trim()
      props.onChange([setIfMissing([]), insert([item], 'after', [-1])])
      setCompteur((c) => c + 1)
    }

    const ajouter = () => {
      if (!pret) return
      enregistrer()
      reset()
      setOuvert(false)
    }

    const ajouterEtAutre = () => {
      if (!pret) return
      enregistrer()
      reset()
      setTimeout(() => posteRef.current?.focus(), 0)
    }

    const fermer = () => { reset(); setCompteur(0); setOuvert(false) }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {props.renderDefault(props)}

        <Button text="Add item" mode="ghost" tone="primary" onClick={() => setOuvert(true)} />

        {ouvert && (
          <Dialog
            id="ajout-credit"
            header="Ajouter un membre de l'équipe"
            width={2}
            onClose={fermer}
            footer={
              <div style={{ padding: 16, display: 'flex', gap: 8, justifyContent: 'flex-end', alignItems: 'center' }}>
                {compteur > 0 && <Text size={1} muted>{compteur} ajouté(s)</Text>}
                <Button text="Ajouter et créer un autre" tone="primary" mode="ghost" disabled={!pret} onClick={ajouterEtAutre} />
                <Button text="Ajouter" tone="primary" disabled={!pret} onClick={ajouter} />
              </div>
            }
          >
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: ECART_CHAMPS }}>

              <div style={bloc}>
                <Text size={1} weight="semibold">Poste (liste)</Text>
                <Select ref={posteRef} value={poste} onChange={(e) => choisirPoste(e.currentTarget.value)}>
                  <option value="">— Choisir le poste —</option>
                  {postesTries.map((p) => {
                    const utilise = dejaUtilises.has(p)
                    return (
                      <option key={p} value={p} disabled={utilise}>
                        {utilise ? `${p} (déjà ajouté)` : p}
                      </option>
                    )
                  })}
                </Select>
              </div>

              {!poste && (
                <div style={bloc}>
                  <Text size={1} weight="semibold">Poste personnalisé</Text>
                  <Text size={1} muted>À remplir uniquement si le poste n'est pas dans la liste ci-dessus.</Text>
                  <TextInput
                    value={custom}
                    onChange={(e) => {
                      setCustom(e.currentTarget.value)
                      setAfficher(afficheParDefaut(e.currentTarget.value))
                    }}
                  />
                </div>
              )}

              <div style={bloc}>
                <Text size={1} weight="semibold">Nom(s)</Text>
                <TextInput
                  placeholder="Jean Dupont — plusieurs personnes : séparez par une virgule ou ·"
                  value={noms}
                  onChange={(e) => setNoms(e.currentTarget.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); ajouterEtAutre() } }}
                />
              </div>

              <Card padding={3} radius={2} border>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Checkbox id="afficher-credit" checked={afficher} onChange={(e) => setAfficher(e.currentTarget.checked)} />
                  <Text size={1}><label htmlFor="afficher-credit">⭐ Afficher sous le film (page de garde)</label></Text>
                </div>
              </Card>

            </div>
          </Dialog>
        )}
      </div>
    )
  }
}